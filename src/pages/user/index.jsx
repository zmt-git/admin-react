import React from 'react';
import style from './index.less'
import { connect } from 'umi'
import { Button } from 'antd'
function Posts(props) {
  const { list } = props
  return (
    <ul>
      {postItems(list)}
    </ul>
  )
}

function postItems(list) {
  if (!Array.isArray(list)) return
  return list.map(post => (
    <li className={style.item} key={post.title}>
      <h3 className={style.title}>{post.title}</h3>
      <p className={style.content}>{post.content}</p>
    </li>
  ))
}

let initialState = 1
function getId () {
  return initialState++
}

function UserPosts (props) {
  const list =props.list;

  const handleAdd = () => {
    props.dispatch({
      type: 'posts/addPost',
      payload: { title: 'add' + getId(), content: 'add content' }
    })
  }

  return (
    <div className="manage">
      <Button onClick={handleAdd}>添加</Button>
      <Posts list={list} />
    </div>
  )
}

export default connect(({ posts }) => (posts))(UserPosts)
