import instance from "./axios";

export const getCaptcha = async () => {
  const resp = await instance.get("/captcha/image", {
    responseType: 'blob'
  })
  return resp
}

export const verifyCaptcha = async (data) => {
  console.log(data)
  const resp = await instance.post("/captcha/verify", data)
  return resp.data

}
