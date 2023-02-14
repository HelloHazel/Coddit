import { useState } from "react";
import { useSelector } from "react-redux";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { Avatar } from "@chakra-ui/react";
import Button from "./Button";
import Header from "../views/UtilPage/Header";

export default function Comment() {
  const user = useSelector((state) => state.userSlice.userName);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      setCommentsList([...commentsList, comment]);
      setComment("");
      setIsValid(false);
    }
  };

  const CommentFeed = ({ userComment, user }) => (
    <div>
      <div>
        <p>{user}</p>
        <div>{userComment}</div>
      </div>
      <HandThumbUpIcon /> <HandThumbDownIcon />
    </div>
  );

  return (
    <div>
      {user && <div>Comment as {user}</div>}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          className="w-full"
          rows={5}
          placeholder="What are your thoughts?"
          value={comment}
          onChange={handleCommentChange}
          onKeyUp={() => setIsValid(comment.length > 0)}
        />
        <div className="text-right">
          <Button
            className="mt-2 bg-gray-500 text-gray-300"
            disabled={!isValid}
            onClick={handleCommentSubmit}
          >
            Comment
          </Button>
        </div>
      </form>
      {commentsList.map((userComment, index) => (
        <CommentFeed key={index} userComment={userComment} user={user} />
      ))}
    </div>
  );
}
