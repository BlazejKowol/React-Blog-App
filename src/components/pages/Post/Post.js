import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPostsById, removePost } from "../../../redux/postsReducer";
import { Link } from "react-router-dom";
import Modals from "../../common/Modals/Modals";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import dateToString from "../../../utils/dateToString";

const Post = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const postData = useSelector(state => getPostsById(state, id));

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postRemove = e => {
    e.preventDefault();
    dispatch(removePost(id))
  }

  if(show) {
    if(!postData) return <Navigate to="/" />
    return (
      <Modals show={show} handleClose={handleClose} postRemove={postRemove} />
    )
  }

  return (
    <div className="m-5 px-5">
      <section className="d-flex justify-content-between mb-3">
        <h3>{postData.title}</h3>
        <div>
          <Link className="text-decoration-none" key={id} to={"/post/edit/" + id}>
            <button className="btn border-info bg-transparent py-2 px-3 mx-1 text-info">Edit</button>
          </Link>
          <button onClick={handleShow} className="btn border-danger bg-transparent py-0 mx-1">
            <p className="m-2 text-danger">Delete</p>
          </button>
        </div>
      </section>
        <h4 className="small"><b>Author: </b>{postData.author}</h4>
        <h4 className="small"><b>Published: </b>{dateToString(postData.date)}</h4>
        <h4 className="small"><b>Category: </b>{postData.category}</h4>
        <p dangerouslySetInnerHTML={{ __html: postData.content }} />
    </div>
  );
};

  export default Post;