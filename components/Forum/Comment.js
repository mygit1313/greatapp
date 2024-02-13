'use client'

import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { addQuestion } from '@/redux/action/frontend/forum';
import { useDispatch } from 'react-redux'

const Comment = ({
    handleInsertNode,
    handleEditNode,
    handleDeleteNode,
    comment,
}) => {
    const dispatch = useDispatch();

    const [inputData, setInput] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [expand, setExpand] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef?.current?.focus();
    }, [editMode]);

    const handleNewComment = () => {
        setExpand(!expand);
        setShowInput(true);
    };

    const onAddComment = async (e) => {
        // if (editMode) {
        //     handleEditNode(comment.id, inputRef?.current?.innerText);
        // } else {
            e.preventDefault();
            setExpand(true);
            //handleInsertNode(comment.id, input);
           await dispatch(addQuestion({
                question: inputData,
                is_reply: 1,
                question_id: comment.id
            }));
            setShowInput(false);
            setInput("");
        // }

        // if (editMode) setEditMode(false);
    };

    return (
        <div>
            <div className={comment.id === 0 ? "inputContainer" : "commentContainer"}>
                {comment.id === 0 ? (
                    <>
                        <input
                            type="text"
                            className="inputContainer__input first_input"
                            autoFocus
                            value={inputData}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="type..."
                        />

                        <Action
                            className="reply comment"
                            type="COMMENT"
                            handleClick={onAddComment}
                        />
                    </>
                ) : (
                    <>
                        <div className={`shadow mt-3 px-10 py-6`}>
                            <div className="flex gap-2 items-center">
                                <div className="">
                                    <UserCircleIcon className='w-8 h-8' />
                                </div>
                                <div className="">
                                    <h5 className="font-semibold">{comment.first_name} {comment.last_name}</h5>
                                    <p className="text-sm">{comment.parent_comment_id == null ? "Asked" : "Replied"} On: {(comment.created_at.split("T"))[0]}</p>
                                </div>
                            </div>
                            <div>
                                {comment.parent_comment_id == null ?
                                    <h5 className="font-semibold mt-3 text-lg">Q : {comment.comment_text}</h5> :

                                    <p className='bg-slate-200 p-3 rounded-lg mt-3'>
                                        {comment.comment_text}
                                    </p>}

                            </div>

                            <div className="flex flex-row gap-2">
                                {editMode ? (
                                    <>
                                        <Action
                                            className="text-[rgb(249,188,96)] font-semibold"
                                            type="Save"
                                            handleClick={onAddComment}
                                        />
                                    </>
                                ) : (
                                    <div className="flex flex-row gap-2 mt-1">
                                        <Action
                                            className="reply"
                                            type={
                                                <div className="flex flex-row items-center text-[rgb(249,188,96)] font-semibold gap-1">
                                                    {expand ? (
                                                        <ChevronUpIcon className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDownIcon className="w-4 h-4" />
                                                    )}{" "} Replies ({comment.items.length})
                                                </div>
                                            }
                                            handleClick={handleNewComment}
                                        />

                                    </div>
                                )}
                            </div>
                        </div>

                    </>
                )}
            </div>

            <div className="mx-5" style={{ display: expand ? "block" : "none" }}>
                {/* {showInput && ( */}
                    <div className="flex flex-row gap-2 mt-5 items-center ml-5">
                        <input
                            type="text"
                            className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium px-4 py-3 mt-1" required
                            autoFocus
                            value={inputData}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Action className="text-green-500 font-semibold my-1" type={
                            <button type="button"
                                className="mt-2 md:mt-0 md:ml-2 w-full md:w-auto rounded-md border border-transparent text-black bg-[rgb(249,188,96)] px-6 py-3 text-base font-medium shadow-sm hover:bg-black hover:text-white"
                            >Reply</button>
                        } handleClick={onAddComment} />
                    </div>
                {/* )} */}

                {comment?.items?.map((cmnt, i) => {
                    return (
                        <div className="ml-5" key={i}>
                            <Comment
                                key={cmnt.id}
                                handleInsertNode={handleInsertNode}
                                handleEditNode={handleEditNode}
                                handleDeleteNode={handleDeleteNode}
                                comment={cmnt}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Comment;
