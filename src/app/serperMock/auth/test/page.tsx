// 'use client'
// import React, { useState, useEffect } from 'react'
// import curlconverter from 'curlconverter'

// const RequestForm = () => {
//   const [url, setUrl] = useState('')
//   const [method, setMethod] = useState('GET')
//   const [headers, setHeaders] = useState('')
//   const [body, setBody] = useState('')
//   const [curlCommand, setCurlCommand] = useState('')
//   const [selectedLanguage, setSelectedLanguage] = useState('python')

//   useEffect(() => {
//     generateCurlCommand()
//   }, [url, method, headers, body])

//   const generateCurlCommand = () => {
//     try {
//       const request = {
//         url,
//         method,
//         headers: headers ? JSON.parse(headers) : {},
//         data: body ? JSON.parse(body) : null,
//       }

//       const myCurl = `curl --location --request POST 'https://google.serper.dev/search' --header 'X-API-KEY: 2aa1f782fa840f29ef0629249d621449d7235651' --header 'Content-Type: application/json' --data-raw '{"q":"apple inc"}'`

//       //   const curl = curlconverter.toC(myCurl)
//       setCurlCommand(myCurl)
//     } catch (error) {
//       setCurlCommand('Invalid JSON format in headers or body.')
//     }
//   }

//   const convertToLanguage = () => {
//     const convertedCode = curlconverter.toNode(curlCommand)
//     // You can use other conversion methods like toPhp, toPython, etc.
//     // based on the selected language
//     // For example: curlconverter.toPython(curlCommand);

//     // Display the converted code or perform further actions
//     console.log(convertedCode)
//   }

//   return (
//     <div>
//       <div>
//         <label>URL:</label>
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Method:</label>
//         <select value={method} onChange={(e) => setMethod(e.target.value)}>
//           <option value="GET">GET</option>
//           <option value="POST">POST</option>
//           <option value="PUT">PUT</option>
//           <option value="DELETE">DELETE</option>
//         </select>
//       </div>
//       <div>
//         <label>Headers (JSON):</label>
//         <textarea
//           value={headers}
//           onChange={(e) => setHeaders(e.target.value)}
//         ></textarea>
//       </div>
//       <div>
//         <label>Body (JSON):</label>
//         <textarea
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//         ></textarea>
//       </div>

//       <div>
//         <h3>cURL Preview:</h3>
//         <pre>{curlCommand}</pre>

//         <div>
//           <label>Convert to:</label>
//           <select
//             value={selectedLanguage}
//             onChange={(e) => setSelectedLanguage(e.target.value)}
//           >
//             <option value="python">Python</option>
//             <option value="node">Node.js</option>
//             <option value="php">PHP</option>
//             {/* Add more language options as needed */}
//           </select>
//           <button onClick={convertToLanguage}>Convert</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RequestForm
