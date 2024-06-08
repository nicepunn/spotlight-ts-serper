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

export const toOtherLang = (curl: string): LanguageState => {
  const others: LanguageState = {
    cSharp: curlToCSharp(curl),
    dart: curlToDart(curl),
    go: curlToGo(curl),
    http: '',
    java: curlToOkHttp(curl),
    javaScript: curlToFetch(curl),
    c: curlToCLibcurl(curl),
    nodeJs: curlToAxios(curl),
    objectiveC: curlToObjectiveC(curl),
    ocaml: '',
    php: '',
    powerShell: '',
    python: '',
    r: '',
    ruby: '',
    shell: '',
    swift: '',
  }
  return others
}
