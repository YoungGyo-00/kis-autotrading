# fetch structure definition

node-fetch 를 사용하는 서비스 함수 만드는 방법

```
// 실제 API 테스트 하는 방법대로 구성
const method: string = // enum 형식에서 고르기
const url: string = BASE_URL + // 추가 주소

const requestHeaders: HeadersInit = new Header();
requestHeaders.append(key, value)

const requestBody: {Body Type} = {
    key: value
}

const options: RequestInit = {
    method: method,
    header: requestHeaders,
    body: JSON.stringify(requestBody)
}
```
