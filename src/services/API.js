import axios from 'axios';

// import authService from './services/auth.service';

var headers;
// if (authService.getCurrentUserAccessToken()) {
  headers = {

    'Authorization': 'eyJhbGciOiJSUzUxMiJ9.eyJleHAiOjE2NTcxNDA1NDUsInVzZXIiOnsiaWQiOjEsImZpcnN0TmFtZSI6ImtlbHZpbiIsImxhc3ROYW1lIjoidGh1a3UiLCJvdGhlck5hbWUiOiJ0aHVrdSIsImVtYWlsIjoidmlrZWxudGh1a3VAZ21haWwuY29tIiwiZW5hYmxlZCI6dHJ1ZSwic3VwZXJVc2VyIjpmYWxzZSwicGhvbmVOdW1iZXIiOiIyNTQ3MjUwMzA5MzkiLCJjbGllbnQiOnsiZGF0ZVRpbWVDcmVhdGVkIjoxNjU3MTAyNzUyMDAwLCJpcEFkZHJlc3MiOiI0MS44NC4xMzAuOTQiLCJpZCI6MSwic3RhdHVzIjp0cnVlLCJuYW1lIjoiTXVpZ2FpIiwiY2xpZW50QmFzZVVybCI6InN0cmluZyIsImFwcEtleSI6Ijg5YjRhZGI2YjNkZjQyNWY5NWUyYzZmYzFjZGM5ZGMzIiwiY2xpZW50VHlwZSI6eyJkYXRlVGltZUNyZWF0ZWQiOm51bGwsImlwQWRkcmVzcyI6bnVsbCwiaWQiOjEsIm5hbWUiOiJDT1JQT1JBVEUifX0sInJvbGUiOnsiZGF0ZVRpbWVDcmVhdGVkIjoxNjU3MTAyNzUyMDAwLCJpcEFkZHJlc3MiOiI0MS44NC4xMzAuOTQiLCJpZCI6MSwibmFtZSI6Ik11aWdhaSBBRE1JTiJ9LCJjb3JyZWxhdG9yIjoiZTg4NjdhOWMtZDhmNy00MzFjLWI4YjMtODFiYmE5NGI1ZjRjIiwidXNlclBlcm1pc3Npb25zIjpbIkNBTl9WSUVXX1JPTEVTIiwiQ0FOX0NSRUFURV9ST0xFUyIsIkNBTl9FRElUX1JPTEVTIiwiQ0FOX0RFTEVURV9ST0xFUyIsIkNBTl9WSUVXX1VTRVJTIiwiQ0FOX1ZJRVdfVVNFUl9ERVRBSUxTIiwiQ0FOX0NSRUFURV9VU0VSUyIsIkNBTl9FRElUX1VTRVJTIiwiQ0FOX1VOTE9DS19VU0VSX0FDQ09VTlQiLCJDQU5fUkVTRVRfVVNFUl9DUkVERU5USUFMUyIsIkNBTl9ERUxFVEVfVVNFUlMiLCJDQU5fREVBQ1RJVkFURV9VU0VSIiwiQ0FOX1ZJRVdfUEVSTUlTU0lPTlMiLCJDQU5fQ1JFQVRFX1BFUk1JU1NJT05TIiwiQ0FOX0VESVRfUEVSTUlTU0lPTlMiLCJDQU5fREVMRVRFX1BFUk1JU1NJT05TIiwiQ0FOX1ZJRVdfRE9DX1RZUEUiLCJDQU5fQ1JFQVRFX0RPQ19UWVBFIiwiQ0FOX0VESVRfRE9DX1RZUEUiLCJDQU5fREVMRVRFX0RPQ19UWVBFIiwiQ0FOX0VOQUJMRV9VU0VSUyJdfSwiaWF0IjoxNjU3MTM2OTQ1LCJ1c2VybmFtZSI6ImRldmVsb3BlciJ9.biGfMvrM7-XxV4bjN8GTXIM2v3HkH85ltU-2oH69yvOSevmk0wb4jmomgcCS6A34ai54IFHLHaDGf7NGsuv_hZAB8dcvb9bRxmT4HlJOHcX3IbGq8LVXLwWX-A-Fj9Ex0a5j4joUUnSqf5wjyqLRnMae22z4HsNTvpv-ibKl1zU6IjMYB6xxU9M6Qi6INfd8WUk5usaujExbJLUv0fXTDlrB5v1sr1bgjEzZW49jgxzYI-wx37VCevDKjZzvfUniYw5dLKb8G0sWJoNdtZpzH9u3w94LklfyhcGCSrfKrqEtNni6KhlJTAVrg_9RBKoBfVaNu_9LlteuQepIx4QS_w',
    'Content-Type': 'application/json',
    'App-key':'d311a73c77dd4043ae8f2b29263b495a'
  };
  
// } else {
// headers = {

    // 'Content-Type': 'application/json'
// };
// }

export const axiosInstance = axios.create({
    headers: headers,
    timeout: 20000,
});

export const baseUrl = "http://142.93.231.97:8081";
