import React from "react";

export const Answer = ({ answer, userId, onDelete }) => (
  <aside className="answer">
    <div dangerouslySetInnerHTML={{ __html: answer.answer }} />{" "}
    <button
      className={
        answer.userId === userId
          ? "btn btn-danger delete1"
          : "notShowDeleteButton"
      }
      onClick={() => onDelete(answer)}
    >
      Eliminar Respuesta
    </button>
  </aside>
);
