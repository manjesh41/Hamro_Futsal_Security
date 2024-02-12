import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Reviews() {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState({});

  const getComments = async () => {
    try {
      // Retrieve the token from local storage
      const token = window.localStorage.getItem("token");

      // Set the headers with the authentication token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get("http://127.0.0.1:3001/reviews", {
        headers,
      });

      setComments(response.data);

      // Extract unique user ids from the comments
      const userIds = Array.from(new Set(response.data.data.map((comment) => comment.user)));

      // Fetch user information for each unique user id
      const usersWithInformation = await Promise.all(
        userIds.map(async (userId) => {
          try {
            const userResponse = await axios.get(
              `http://127.0.0.1:3001/users/${userId}`,
              {
                headers,
              }
            );
            return { [userId]: userResponse.data.data }; // Store user information in an object with userId as the key
          } catch (error) {
            console.error("Error fetching user information:", error);
            return { [userId]: null }; // Return null user object to indicate not found
          }
        })
      );

      // Merge all user objects into a single object
      const mergedUsers = Object.assign({}, ...usersWithInformation);

      setUsers(mergedUsers);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Handle the error here, e.g., set an error state and display an error message to the user.
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = async (event) => {
    event.preventDefault();

    if (newComment.trim() !== "") {
      const comment = {
        id: Date.now(),
        content: newComment,
        author: "Current User",
      };

      try {
        // Retrieve the token from local storage
        const token = window.localStorage.getItem("token");
  
        // Set the headers with the authentication token
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        // Make the POST request to the API to add the comment
        await axios.post("http://127.0.0.1:3001/reviews", comment, {
          headers,
        });
  
        // Update the state by adding the new comment to the list
        setComments((prevComments) => ({
          ...prevComments,
          data: [...prevComments.data, comment],
        }));
  
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
        // Handle the error here, e.g., set an error state and display an error message to the user.
      }
    }
  };

  const deleteComment = async (id) => {
    try {
      // Retrieve the token from local storage
      const token = window.localStorage.getItem("token");
  
      // Set the headers with the authentication token
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      // Make the DELETE request to the API to delete the comment
      await axios.delete(`http://127.0.0.1:3001/reviews/${id}`, {
        headers,
      });
  
      // Update the state by filtering out the deleted comment
      setComments((prevComments) => ({
        ...prevComments,
        data: prevComments.data.filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Handle the error here, e.g., set an error state and display an error message to the user.
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="reviews min-h-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-center font-bold text-xl">All Comments</h1>
        
        {comments?.data?.map((comment) => (
          <div
            key={comment.id}
            className="bg-white flex items-center justify-between rounded-lg shadow-md p-4 mb-4"
          >
            <div>
            <p className="text-lg font-bold ">{users[comment.user]?.fname} {users[comment.user]?.lname}</p>
            <p className="text-sm italic mb-2">{users[comment.user]?.email}</p> 
            <p className="text-lg mb-2">{comment.text}</p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex gap-4">
                <button
                  className="text-sm text-white w-[5rem] px-4 py-1.5 rounded-lg font-semibold bg-red-600 hover:bg-red-800"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
