import React, { useEffect, useState } from 'react'
import {useLoaderData} from 'react-router-dom'

const Github = () => {
    const data = useLoaderData()
    // const [data, setdata] = useState([])
    // useEffect(() => {
    //   fetch('https://api.github.com/users/jaiswaldeepali27')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     setdata(data)
    //   })
    // }, [])
    
  return (
    <div>Github followers: {data.followers}
    <img src={data.avatar_url} alt="image" /></div>
  )
}

export default Github

export const githubnfo = async () => {
    const res = await fetch('https://api.github.com/users/jaiswaldeepali27')
    return res.json()
}