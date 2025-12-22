import instance from "./axios";

export const getAllTerm = async () => {
  const res = await instance.get("/term");
  return res.data.data; // List<TermResp>
};

export const getTermById = async (id) => {
  const res = await instance.get(`/term/${id}`);
  return res.data.data; // TermResp
};

export const getTermPage = async ({ pageNum = 1, pageSize = 10 }) => {
  const res = await instance.get("/term/page", {
    params: { page: pageNum, size: pageSize, sort: "startDate,desc" },
  });
  return res.data.data; // Page<TermResp> { content: [...], totalElements: 66 }
};

