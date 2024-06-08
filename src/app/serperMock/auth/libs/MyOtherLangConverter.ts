import { LanguageState } from '../../interfaces'

const curlToCSharp = (curl: string): string => {
  const lines = curl.split('\\\n').map((line) => line.trim())
  const urlLine = lines.find((line) => line.startsWith('curl'))
  const urlMatch = urlLine?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  const method = urlLine?.includes('--request') ? 'Method.POST' : 'Method.GET'
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const headerMatch = line.match(/'([^']+): ([^']+)'/)
      return headerMatch ? { key: headerMatch[1], value: headerMatch[2] } : null
    })
    .filter(Boolean) as { key: string; value: string }[]

  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const bodyMatch = dataLine?.match(/'([^']+)'/)
  const body = bodyMatch ? bodyMatch[1].replace(/"/g, '""') : ''

  return `var client = new RestClient("${url}");
client.Timeout = -1;
var request = new RestRequest(${method});
${headers
  .map((header) => `request.AddHeader("${header.key}", "${header.value}");`)
  .join('\n')}
var body = @"${body}";
request.AddParameter("application/json", body, ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
Console.WriteLine(response.Content);`
}

const curlToDart = (curl: string): string => {
  const lines = curl.split('\\\n').map((line) => line.trim())
  const urlLine = lines.find((line) => line.startsWith('curl'))
  const urlMatch = urlLine?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const headerMatch = line.match(/'([^']+): ([^']+)'/)
      return headerMatch ? { key: headerMatch[1], value: headerMatch[2] } : null
    })
    .filter(Boolean) as { key: string; value: string }[]

  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const bodyMatch = dataLine?.match(/'([^']+)'/)
  const body = bodyMatch ? JSON.parse(bodyMatch[1]) : ''

  return `var headers = {
  ${headers.map((header) => `'${header.key}': '${header.value}'`).join(',\n  ')}
};
var request = http.Request('POST', Uri.parse('${url}'));
request.body = json.encode(${JSON.stringify(body, null, 2)});

request.headers.addAll(headers);

http.StreamedResponse response = await request.send();

if (response.statusCode == 200) {
  print(await response.stream.bytesToString());
} else {
  print(response.reasonPhrase);
}
    `
}

const curlToGo = (curl: string): string => {
  const lines = curl.split('\\\n').map((line) => line.trim())
  const urlLine = lines.find((line) => line.startsWith('curl'))
  const urlMatch = urlLine?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const headerMatch = line.match(/'([^']+): ([^']+)'/)
      return headerMatch ? { key: headerMatch[1], value: headerMatch[2] } : null
    })
    .filter(Boolean) as { key: string; value: string }[]

  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const bodyMatch = dataLine?.match(/'([^']+)'/)
  const body = bodyMatch ? JSON.parse(bodyMatch[1]) : ''

  return `package main

import (
  "fmt"
  "strings"
  "net/http"
  "io/ioutil"
)

func main() {
  url := "${url}"
  method := "POST"

  payload := strings.NewReader(\`${JSON.stringify(body, null, 4)}\`)

  client := &http.Client{}
  req, err := http.NewRequest(method, url, payload)

  if err != nil {
    fmt.Println(err)
    return
  }
  ${headers
    .map((header) => `req.Header.Add("${header.key}", "${header.value}")`)
    .join('\n  ')}

  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}
    `
}

const curlToOkHttp = (curl: string): string => {
  const lines = curl.split('\\\n').map((line) => line.trim())
  const urlLine = lines.find((line) => line.startsWith('curl'))
  const urlMatch = urlLine?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  const methodMatch = urlLine?.match(/--request (\w+)/)
  const method = methodMatch ? methodMatch[1] : 'GET'

  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const headerMatch = line.match(/'([^']+): ([^']+)'/)
      return headerMatch ? { key: headerMatch[1], value: headerMatch[2] } : null
    })
    .filter(Boolean) as { key: string; value: string }[]

  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const bodyMatch = dataLine?.match(/'([^']+)'/)
  const body = bodyMatch ? bodyMatch[1] : ''

  return `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "${body.replace(
    /"/g,
    '\\"',
  )}");
Request request = new Request.Builder()
  .url("${url}")
  .method("${method}", body)
  ${headers
    .map((header) => `.addHeader("${header.key}", "${header.value}")`)
    .join('\n  ')}
  .build();
Response response = client.newCall(request).execute();
`
}

const curlToFetch = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract the URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches
        ? `myHeaders.append("${matches[1]}", "${matches[2]}");`
        : ''
    })
    .filter((line) => line !== '')

  // Extract the body data and format it as JSON
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Parse and stringify the JSON to ensure correct formatting
  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 2) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Construct the fetch request
  return `var myHeaders = new Headers();
${headers.join('\n')}

var raw = JSON.stringify(${formattedBody});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("${url}", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
`
}

type CurlHeader = { key: string; value: string }

const curlToCLibcurl = (curlCommand: string): string => {
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches ? `${matches[1]}: ${matches[2]}` : ''
    })
    .filter((line) => line !== '')

  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Construct the C libcurl code
  return `CURL *curl;
CURLcode res;
curl = curl_easy_init();
if(curl) {
  curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");
  curl_easy_setopt(curl, CURLOPT_URL, "${url}");
  curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
  curl_easy_setopt(curl, CURLOPT_DEFAULT_PROTOCOL, "https");
  struct curl_slist *headers = NULL;
  ${headers
    .map((header) => `headers = curl_slist_append(headers, "${header}");`)
    .join('\n  ')}
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  const char *data = "${body.replace(/"/g, '\\"')}";
  curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);
  res = curl_easy_perform(curl);
  if (res != CURLE_OK) {
    fprintf(stderr, "curl_easy_perform() failed: %s\\n", curl_easy_strerror(res));
  }
}
curl_easy_cleanup(curl);
curl_slist_free_all(headers);
`
}

const curlToAxios = (curlCommand: string): string => {
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches ? `'${matches[1]}': '${matches[2]}'` : ''
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 2) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Generate Axios code for Node.js
  return `const axios = require('axios');
let data = JSON.stringify(${formattedBody});

let config = {
  method: 'post',
  url: '${url}',
  headers: { 
    ${headers.join(',\n    ')}
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
`
}

const curlToObjectiveC = (curlCommand: string): string => {
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches ? `@"${matches[1]}": @"${matches[2]}"` : ''
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Generate Objective-C code
  return `#import <Foundation/Foundation.h>

dispatch_semaphore_t sema = dispatch_semaphore_create(0);

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"${url}"]
  cachePolicy:NSURLRequestUseProtocolCachePolicy
  timeoutInterval:10.0];
NSDictionary *headers = @{
  ${headers.join(',\n  ')}
};

[request setAllHTTPHeaderFields:headers];
NSData *postData = [[NSData alloc] initWithData:[@"${body.replace(
    /"/g,
    '\\"',
  )}" dataUsingEncoding:NSUTF8StringEncoding]];
[request setHTTPBody:postData];

[request setHTTPMethod:@"POST"];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
  if (error) {
    NSLog(@"%@", error);
    dispatch_semaphore_signal(sema);
  } else {
    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
    NSError *parseError = nil;
    NSDictionary *responseDictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:&parseError];
    NSLog(@"%@",responseDictionary);
    dispatch_semaphore_signal(sema);
  }
}];
[dataTask resume];
dispatch_semaphore_wait(sema, DISPATCH_TIME_FOREVER);
`
}

const curlToOCamlCohttp = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches ? { key: matches[1], value: matches[2] } : null
    })
    .filter(
      (header): header is { key: string; value: string } => header !== null,
    )

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Generate OCaml code
  return `open Lwt
open Cohttp
open Cohttp_lwt_unix

let postData = ref ${JSON.stringify(body)};

let reqBody = 
  let uri = Uri.of_string "${url}" in
  let headers = Header.init ()
    ${headers
      .map(
        (header) =>
          `    |> fun h -> Header.add h "${header.key}" "${header.value}"`,
      )
      .join('\n')}
  in
  let body = Cohttp_lwt.Body.of_string !postData in

  Client.call ~headers ~body \`POST uri >>= fun (_resp, body) ->
  body |> Cohttp_lwt.Body.to_string >|= fun body -> body

let () =
  let respBody = Lwt_main.run reqBody in
  print_endline (respBody)
`
}

const curlToPHPCurl = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches ? `"${matches[1]}: ${matches[2]}"` : ''
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Generate PHP code
  return `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => '${url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => '${body.replace(/"/g, '\\"')}',
  CURLOPT_HTTPHEADER => array(
    ${headers.join(',\n    ')}
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
`
}

const curlToPowerShell = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches ? `$headers.Add("${matches[1]}", "${matches[2]}")` : ''
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Generate PowerShell code
  return `$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
${headers.join('\n')}
$body = '${body.replace(/"/g, '`"')}'

$response = Invoke-RestMethod '${url}' -Method 'POST' -Headers $headers -Body $body
$response | ConvertTo-Json
`
}

const curlToPythonHttp = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL and path
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'https:\/\/([^\/]+)(\/.+)'/)
  const hostname = urlMatch ? urlMatch[1] : ''
  const path = urlMatch ? urlMatch[2] : ''

  // Initialize headers array
  const headers: string[] = []

  // Process each line that starts with '--header'
  lines
    .filter((line) => line.startsWith('--header'))
    .forEach((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      if (matches && matches.length >= 3) {
        headers.push(`'${matches[1]}': '${matches[2]}'`)
      }
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const bodyMatch = dataLine ? dataLine.match(/'(.*)'/) : null
  const body = bodyMatch ? bodyMatch[1] : ''

  // Parse and stringify the JSON to ensure correct formatting
  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 2) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Generate Python code
  return `import http.client
import json

conn = http.client.HTTPSConnection("${hostname}")
payload = json.dumps(${formattedBody})
headers = {
  ${headers.join(',\n  ')}
}
conn.request("POST", "${path}", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))
`
}

const curlToRhttr = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches ? `'${matches[1]}' = '${matches[2]}'` : ''
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Parse and stringify the JSON to ensure correct formatting
  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 2) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Generate R code using the httr library
  return `library(httr)

headers = c(
  ${headers.join(',\n  ')}
)

body = '${formattedBody}';

res <- VERB("POST", url = "${url}", body = body, add_headers(headers))

cat(content(res, "text"))
`
}

const curlToRuby = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches ? `request["${matches[1]}"] = "${matches[2]}"` : ''
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Parse and stringify the JSON to ensure correct formatting
  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 2) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Generate Ruby code using net/http and json libraries
  return `require "uri"
require "json"
require "net/http"

url = URI("${url}")

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Post.new(url)
${headers.join('\n')}
request.body = JSON.dump(${formattedBody})

response = https.request(request)
puts response.read_body
`
}

const curlToHttpie = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches ? `${matches[1]}:'${matches[2]}'` : ''
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Generate HTTPie command
  return `printf '${body.replace(
    /'/g,
    `'"'"'`,
  )}' | http --follow --timeout 3600 POST '${url}' \\
 ${headers.join(' \\\n ')}
`
}

const curlToSwift = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches
        ? `request.addValue("${matches[2]}", forHTTPHeaderField: "${matches[1]}")`
        : ''
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Generate Swift code
  return `import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif

var semaphore = DispatchSemaphore (value: 0)

let parameters = ${JSON.stringify(body)}
let postData = parameters.data(using: .utf8)

var request = URLRequest(url: URL(string: "${url}")!,timeoutInterval: Double.infinity)
${headers.join('\n')}
request.httpMethod = "POST"
request.httpBody = postData

let task = URLSession.shared.dataTask(with: request) { data, response, error in 
  guard let data = data else {
    print(String(describing: error))
    semaphore.signal()
    return
  }
  print(String(data: data, encoding: .utf8)!)
  semaphore.signal()
}

task.resume()
semaphore.wait()
`
}

const curlToRawHttpRequest = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL and path
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'https:\/\/([^\/]+)(\/.+)'/)
  const host = urlMatch ? urlMatch[1] : ''
  const path = urlMatch ? urlMatch[2] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches ? `${matches[1]}: ${matches[2]}` : ''
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Calculate content length
  const contentLength = Buffer.byteLength(body, 'utf8')

  // Generate raw HTTP request
  return `POST ${path} HTTP/1.1
Host: ${host}
${headers.join('\n')}
Content-Length: ${contentLength}
${body}`
}

const curlToJavaUnirest = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches ? `.header("${matches[1]}", "${matches[2]}")` : ''
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Generate Java code using Unirest
  return `Unirest.setTimeouts(0, 0);
HttpResponse<String> response = Unirest.post("${url}")
  ${headers.join('\n  ')}
  .body("${body.replace(/"/g, '\\"')}")
  .asString();
`
}

const curlToJQueryAjax = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers: { [key: string]: string } = {}
  lines
    .filter((line) => line.startsWith('--header'))
    .forEach((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      if (matches) {
        headers[matches[1]] = matches[2]
      }
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Parse and stringify the JSON to ensure correct formatting
  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 4) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Generate jQuery AJAX code
  return `var settings = {
  "url": "${url}",
  "method": "POST",
  "timeout": 0,
  "headers": ${JSON.stringify(headers, null, 2)},
  "data": JSON.stringify(${formattedBody}),
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
`
}

const curlToXMLHttpRequest = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers: { [key: string]: string } = {}
  lines
    .filter((line) => line.startsWith('--header'))
    .forEach((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      if (matches) {
        headers[matches[1]] = matches[2]
      }
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Parse and stringify the JSON to ensure correct formatting
  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 2) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Generate XMLHttpRequest JavaScript code
  return `// WARNING: For POST requests, body is set to null by browsers.
var data = JSON.stringify(${formattedBody});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "${url}");
${Object.keys(headers)
  .map((key) => `xhr.setRequestHeader("${key}", "${headers[key]}");`)
  .join('\n')}
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);
`
}

const curlToNodeNative = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL components
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'https:\/\/([^\/]+)(\/.*)'/)
  const hostname = urlMatch ? urlMatch[1] : ''
  const path = urlMatch ? urlMatch[2] : ''

  // Extract headers
  const headers: { [key: string]: string } = {}
  lines
    .filter((line) => line.startsWith('--header'))
    .forEach((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      if (matches) {
        headers[matches[1]] = matches[2]
      }
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Parse and stringify the JSON to ensure correct formatting
  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 2) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Generate Node.js code using https module
  return `const https = require('follow-redirects').https;
const fs = require('fs');

let options = {
  'method': 'POST',
  'hostname': '${hostname}',
  'path': '${path}',
  'headers': {
    ${Object.keys(headers)
      .map((key) => `'${key}': '${headers[key]}'`)
      .join(',\n    ')}
  },
  'maxRedirects': 20
};

const req = https.request(options, (res) => {
  let chunks = [];

  res.on("data", (chunk) => {
    chunks.push(chunk);
  });

  res.on("end", (chunk) => {
    let body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", (error) => {
    console.error(error);
  });
});

let postData = JSON.stringify(${formattedBody});

req.write(postData);

req.end();
`
}

const curlToNodeRequest = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers: { [key: string]: string } = {}
  lines
    .filter((line) => line.startsWith('--header'))
    .forEach((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      if (matches) {
        headers[matches[1]] = matches[2]
      }
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Parse and stringify the JSON to ensure correct formatting
  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 4) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Generate Node.js code using request module
  return `const request = require('request');
let options = {
  'method': 'POST',
  'url': '${url}',
  'headers': {
    ${Object.keys(headers)
      .map((key) => `'${key}': '${headers[key]}'`)
      .join(',\n    ')}
  },
  body: JSON.stringify(${formattedBody})

};
request(options, (error, response) => {
  if (error) throw new Error(error);
  console.log(response.body);
});
`
}

const curlToNodeUnirest = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers: { [key: string]: string } = {}
  lines
    .filter((line) => line.startsWith('--header'))
    .forEach((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      if (matches) {
        headers[matches[1]] = matches[2]
      }
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Parse and stringify the JSON to ensure correct formatting
  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 4) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Generate Node.js code using unirest module
  return `const unirest = require('unirest');
const req = unirest('POST', '${url}')
  .headers({
    ${Object.keys(headers)
      .map((key) => `'${key}': '${headers[key]}'`)
      .join(',\n    ')}
  })
  .send(JSON.stringify(${formattedBody}))
  .end((res) => { 
    if (res.error) throw new Error(res.error); 
    console.log(res.raw_body);
  });
`
}

const curlToPHPGuzzle = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers: { [key: string]: string } = {}
  lines
    .filter((line) => line.startsWith('--header'))
    .forEach((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      if (matches) {
        headers[matches[1]] = matches[2]
      }
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Parse and stringify the JSON to ensure correct formatting
  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 2) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Generate PHP code using Guzzle
  return `<?php
$client = new Client();
$headers = [
  ${Object.keys(headers)
    .map((key) => `'${key}' => '${headers[key]}'`)
    .join(',\n  ')}
];
$body = '${formattedBody}';
$request = new Request('POST', '${url}', $headers, $body);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();
`
}

const curlToPHPHttpRequest2 = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers: { [key: string]: string } = {}
  lines
    .filter((line) => line.startsWith('--header'))
    .forEach((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      if (matches) {
        headers[matches[1]] = matches[2]
      }
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Generate PHP code using HTTP_Request2
  return `<?php
require_once 'HTTP/Request2.php';
$request = new HTTP_Request2();
$request->setUrl('${url}');
$request->setMethod(HTTP_Request2::METHOD_POST);
$request->setConfig(array(
  'follow_redirects' => TRUE
));
$request->setHeader(array(
  ${Object.keys(headers)
    .map((key) => `'${key}' => '${headers[key]}'`)
    .join(',\n  ')}
));
$request->setBody('${body.replace(/'/g, "\\'")}');
try {
  $response = $request->send();
  if ($response->getStatus() == 200) {
    echo $response->getBody();
  }
  else {
    echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
    $response->getReasonPhrase();
  }
}
catch(HTTP_Request2_Exception $e) {
  echo 'Error: ' . $e->getMessage();
}
`
}

const curlToPHPHttpPecl = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers: { [key: string]: string } = {}
  lines
    .filter((line) => line.startsWith('--header'))
    .forEach((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      if (matches) {
        headers[matches[1]] = matches[2]
      }
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Generate PHP code using http\Client
  return `<?php
$client = new http\\Client;
$request = new http\\Client\\Request;
$request->setRequestUrl('${url}');
$request->setRequestMethod('POST');
$body = new http\\Message\\Body;
$body->append('${body.replace(/'/g, "\\'")}');
$request->setBody($body);
$request->setOptions(array());
$request->setHeaders(array(
  ${Object.keys(headers)
    .map((key) => `'${key}' => '${headers[key]}'`)
    .join(',\n  ')}
));
$client->enqueue($request)->send();
$response = $client->getResponse();
echo $response->getBody();
`
}

const curlToPythonRequests = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers: { [key: string]: string } = {}
  lines
    .filter((line) => line.startsWith('--header'))
    .forEach((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      if (matches) {
        headers[matches[1]] = matches[2]
      }
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Parse and stringify the JSON to ensure correct formatting
  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 2) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Generate Python code using requests library
  return `import requests
import json

url = "${url}"

payload = json.dumps(${formattedBody})
headers = {
  ${Object.keys(headers)
    .map((key) => `'${key}': '${headers[key]}'`)
    .join(',\n  ')}
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
`
}

const curlToRRCurl = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers: { [key: string]: string } = {}
  lines
    .filter((line) => line.startsWith('--header'))
    .forEach((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      if (matches) {
        headers[matches[1]] = matches[2]
      }
    })

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Parse and stringify the JSON to ensure correct formatting
  let formattedBody = ''
  try {
    const jsonBody = JSON.parse(body)
    formattedBody = JSON.stringify(jsonBody, null, 2) // Pretty print JSON
  } catch (error) {
    console.error('Failed to parse JSON body from cURL command.')
    formattedBody = body // Use original body if JSON parsing fails
  }

  // Generate R code using RCurl library
  return `library(RCurl)
headers = c(
  ${Object.keys(headers)
    .map((key) => `"${key}" = "${headers[key]}"`)
    .join(',\n  ')}
)
params = "${formattedBody.replace(/"/g, '\\"')}"
res <- postForm("${url}", .opts=list(postfields = params, httpheader = headers, followlocation = TRUE), style = "httppost")
cat(res)
`
}

const curlToWget = (curlCommand: string): string => {
  // Split the cURL command into lines and trim whitespace
  const lines = curlCommand.split('\\\n').map((line) => line.trim())

  // Extract URL from the cURL command
  const urlMatch = lines
    .find((line) => line.includes('--request POST'))
    ?.match(/'([^']+)'/)
  const url = urlMatch ? urlMatch[1] : ''

  // Extract headers
  const headers = lines
    .filter((line) => line.startsWith('--header'))
    .map((line) => {
      const matches = line.match(/'([^']+): ([^']+)'/)
      return matches ? `--header '${matches[1]}: ${matches[2]}'` : ''
    })
    .join(' \\\n  ')

  // Extract the body data
  const dataLine = lines.find((line) => line.startsWith('--data-raw'))
  const body = dataLine ? dataLine.match(/'(.*)'/)![1] : ''

  // Generate wget command
  return `wget --no-check-certificate --quiet \\
  --method POST \\
  --timeout=0 \\
  ${headers} \\
  --body-data '${body.replace(/'/g, `'"'"'`)}' \\
   '${url}'
`
}

const curlToJava = (curl: string, method: string) => {
  switch (method) {
    case 'OkHttp':
      return curlToOkHttp(curl)
    case 'Unirest':
      return curlToJavaUnirest(curl)
    default:
      return ''
  }
}

const curlToJavaScript = (curl: string, method: string) => {
  switch (method) {
    case 'Fetch':
      return curlToFetch(curl)
    case 'jQuery':
      return curlToJQueryAjax(curl)
    case 'XHR':
      return curlToXMLHttpRequest(curl)
    default:
      return ''
  }
}

const curlToNodeJs = (curl: string, method: string) => {
  switch (method) {
    case 'Axios':
      return curlToAxios(curl)
    case 'Native':
      return curlToNodeNative(curl)
    case 'Request':
      return curlToNodeRequest(curl)
    case 'Unirest':
      return curlToNodeUnirest(curl)
    default:
      return ''
  }
}

const curlToPHP = (curl: string, method: string) => {
  switch (method) {
    case 'cURL':
      return curlToPHPCurl(curl)
    case 'Guzzle':
      return curlToPHPGuzzle(curl)
    case 'HTTP_Request2':
      return curlToPHPHttpRequest2(curl)
    case 'pecl_http':
      return curlToPHPHttpPecl(curl)
    default:
      return ''
  }
}

const curlToPython = (curl: string, method: string) => {
  switch (method) {
    case 'http.client':
      return curlToPythonHttp(curl)
    case 'Requests':
      return curlToPythonRequests(curl)
    default:
      return ''
  }
}

const curlToR = (curl: string, method: string) => {
  switch (method) {
    case 'httr':
      return curlToRhttr(curl)
    case 'RCurl':
      return curlToRRCurl(curl)
    default:
      return ''
  }
}

const curlToShell = (curl: string, method: string) => {
  switch (method) {
    case 'Httpie':
      return curlToHttpie(curl)
    case 'wget':
      return curlToWget(curl)
    default:
      return ''
  }
}

export const toOtherLang = (curl: string, method: string): LanguageState => {
  const others: LanguageState = {
    cSharp: curlToCSharp(curl),
    dart: curlToDart(curl),
    go: curlToGo(curl),
    http: curlToRawHttpRequest(curl),
    java: curlToJava(curl, method),
    javaScript: curlToJavaScript(curl, method),
    c: curlToCLibcurl(curl),
    nodeJs: curlToNodeJs(curl, method),
    objectiveC: curlToObjectiveC(curl),
    ocaml: curlToOCamlCohttp(curl),
    php: curlToPHP(curl, method),
    powerShell: curlToPowerShell(curl),
    python: curlToPython(curl, method),
    r: curlToR(curl, method),
    ruby: curlToRuby(curl),
    shell: curlToShell(curl, method),
    swift: curlToSwift(curl),
  }
  return others
}
