import { Result, Button } from 'antd'
import { history } from 'umi'
export default function ErrorPages (props) {
  const code = props.location.query.code || 404
  const onBack = () => {
    history.push('/')
  }
  return (
    <Result
      status={code}
      title={code}
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary" onClick={onBack}>返回首页</Button>}
    />
  )
}
