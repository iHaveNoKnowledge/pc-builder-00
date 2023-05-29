import React from "react";
import { useGetPostsQuery } from "../api/dataApiSlice";
import { Alert, Stack } from "@mui/material";

const PostCard = ({ content }) => {
  ////ส่วนแสดงผลสิ่งที่เราจะ present ใน component นี้
  return (
    <div className="col-lg-12 mb-3 " key={content.id}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{content.title}</h5>
          <p className="card-text">{content.body}</p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

////ส่วนนี้เป็นส่วน dynamic display based on api state
function PostsList() {
  ///เอา ค่า boolean status api มา ในหลายๆกรณี
  const {
    data: posts, //dataที่ได้จาก api เก็บไว้ในตัวแปร posts
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  // postContentเป็นตัวแปรที่รอรับผลลัพธ์ จากสาม กรณี ด้านล่าง (isLoading,isSuccess,isError)
  let postContent;

  ////กรณีกำลังโหลด
  if (isLoading) {
    ///ให้เก็บหน้า html ไว้ใน postContent ดังนี้เอาไว้ return ภายหลัง
    postContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
    ////กรณีโหลดสำเร็จ
  } else if (isSuccess) {
    ///เอา [posts] ซึ่งเป็น array data ที่ได้จากการ fetchจาก endpoints ที่เราเลือก มาใน dataApiSLice เอามาทำการ map() แล้วส่งไป เป็น prop ให้ตัวหลักข้างบนที่เราจะแสดงผล
    postContent = posts.map((item) => {
      return <PostCard content={item} key={item.id} />;
    });
    ////กรณีError
  } else if (isError) {
    ///postContent เก็บ div ก้อนนึง ทำหน้าที่โชว alert
    postContent = (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">{error}</Alert>
      </Stack>
    );
  }
  ///อะไรเกิดขึ้นมันจะมา return เพื่อแสดงผลตรงนี้
  return <div>{postContent}</div>;
}
export default PostsList;
