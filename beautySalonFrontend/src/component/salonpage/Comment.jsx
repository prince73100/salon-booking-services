/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { customeraction } from '../../../store/customerStore'
import { useEffect, useRef, useState } from 'react';
import apiUrl from '../../config/config';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from "react-intersection-observer";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Comment({ salonId, token }) {
    const { profilename, comment } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const commentref = useRef()

    const [page, setPage] = useState(1); // Current page
    const [loading, setLoading] = useState(false); // Loading state
    const [hasMore, setHasMore] = useState(true); // Flag to check if more data exists
    const [data, setData] = useState([]); // Data for the section

    // ----------------------- for handle post a comment ---------------------------------------------
    const onhandleComment = async () => {
        if (commentref.current.value !== "") {
            const data = {
                comment: commentref.current.value
            }
            try {
                const response = await axios.post(`${apiUrl}/api/v1/comment/postcomment/${salonId}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.data.status === 'success') {
                    dispatch(customeraction.toaddComment(response.data.newComment))
                    commentref.current.value = ""
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            alert("Enter comment")
        }
    }


    // ----------------------------for fetch all comment to related sallon -------------------------------------------
    const fetch_all_comment = async (page) => {
        try {
            setLoading(true)
            const response = await axios.get(`${apiUrl}/api/v1/comment/gelAllComment/${salonId}?page=${page}&limit=5`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.allComment.length === 0) {
                setHasMore(false)
            }
            if (response.data.status === 'success') {
                setLoading(false)
                dispatch(customeraction.tohandleComment(response.data.allComment))
                setData([...data, ...response.data.allComment])
            }

        } catch (error) {
            console.error(error)
        }
    }

    const returnDayyesrminsecondfunction = (dbdate) => {
        const diff = new Date() - new Date(dbdate)
        if (diff < 60000) {
            return ` ${Math.floor(diff / 1000)} second`
        } else if (diff < 3600000) {
            return `${Math.floor((diff / 3600000) * 60)} min`
        } else if (diff < 86400000) {
            return `${Math.floor((diff / 86400000) * 24)} hours`
        } else if (diff < 2592000000) {
            return `${Math.floor((diff / 2592000000) * 30)} day`
        }
    }
    // Fetch data when the page or section scrolls to the bottom
    useEffect(() => {
        fetch_all_comment(page);
    }, [page]);

    const fetchnextdata = () => {
        setPage(page + 1)

    }
    return (
        <>
            <div className='px-5 my-20 relative '>
                <div>
                    <h1 className='font-bold text-xl '>
                        {data.length} Comment
                    </h1>
                </div>
                <div className='flex gap-x-10  lg:flex lg:justify-between lg:items-center md:flex md:justify-between md:items-center sm:flex sm:justify-between sm:items-center mt-10'>
                    <div className='bg-gray-600 text-white font-bold  py-2 px-4 rounded-full'>
                        {profilename}
                    </div>
                    <div className="input-comment w-3/4  lg:w-3/4 md:w-3/4 sm:w-3/4  flex justify-between items-center h-10 border-b-2 border-rose-700 ">
                        <input type="text" placeholder='Add Comment' className='border-none outline-none w-10/12   bg-transparent ' ref={commentref} />
                    </div>
                </div>
                <div className='mt-5 absolute right-5'>
                    <button className='bg-rose-500 text-white  font-bold text-lg px-2 py-2 rounded-xl active:bg-rose-700'
                        onClick={onhandleComment}
                    >
                        Comment
                    </button>
                </div>
            </div>

            {
                data.length > 0 ? <div className="comment-list px-1 sm:px-5 h-72  overflow-y-scroll">
                    {data?.map((comment) => <div className=' flex items-center gap-x-2 sm:gap-x-5 lg:flex lg:justify-between md:flex md:justify-between sm:flex sm:justify-between my-10 py-2' key={comment._id}>
                        <div className='flex justify-center h-8 w-8 items-center bg-gray-600 text-white font-bold    rounded-full lg:h-10 lg:w-10 md:h-10 md:w-10 sm:h-10 sm:w-10'>
                            {comment?.commentby?.firstname?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="input-comment w-11/12    items-center h-10">
                            <div className=''>
                                <div className='flex justify-between sm:gap-x-5  '>
                                    <p className='font-bold '>{comment.commentby.email}</p>
                                    <p className='text-green-700 font-bold'>{
                                        returnDayyesrminsecondfunction(comment?.createdAt)
                                    }</p>
                                </div>
                                <p className='pt-1'>{comment.comment} </p>
                            </div>
                        </div>
                    </div>

                    )}
                    {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress sx={{ color: "red" }} />
                    </Box>}

                    {hasMore && <p className="text-center text-rose-700" onClick={fetchnextdata}> <span className='  cursor-pointer text-rose-700 underline '>see more comment</span> ...</p>}
                </div> : <></>
            }
        </>
    )
}

export default Comment



/*



*/ 