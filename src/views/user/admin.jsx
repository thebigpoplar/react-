import React, {useState,useEffect, useRef} from 'react';
import { Table, Tag, Space, Button, Modal, Form, Input, Radio, message, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAdminlist, addAdmin, deleteAdmin, findAdmin, updataAdmin } from '../../api/admin';
function Com() {
    const [adminlist, setAdminlist] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize,setPageSize] = useState(10)
    useEffect(() => {
        async function fetchData () {
            const res = await getAdminlist()
            setAdminlist(res.data.data)
        }
        fetchData()
    }, []);
    // 删除的操作
    const confirm = (adminid, index) =>{
        deleteAdmin({adminid} ).then(() => {
             //将数据进行深拷贝,然后去删除数据,通过索引删除
            const arr = JSON.parse(JSON.stringify(adminlist)) // 深拷贝
            console.log(arr.length,'456')
            arr.splice(index,1) //设定删除index
            setTimeout(() => {
                message.success({ content: '删除成功!', duration: 2 });
              }, 500);
              // 判断arr.length的长度是不是11 21  31 ...若是,则page-1
            if (( arr.length + 1 ) % pageSize === 1 ) {
                setPage(page-1)
                }
                setAdminlist(arr) //重新设定新的数据渲染
        })
    }
    const cancel = () => {}
    //修改的操作
    const amendRef = useRef()
    const [ amentVisible, setAmentVisible ] = useState(false) //设定弹出层的状态
    const amenthandleCancel = () => { setAmentVisible(false) } //点击遮罩层或右上角×按钮的回调函数
    const amenthandleOk = () => {} //点击确定到的回调函数
    const onadmenFinish = (value) => {
        // 判断修改的内容 如果没有修改就提示
        // 在adminlist中查询 原始的数值,与新的数值对比,若果发生变化就提交,没有修改就提示用户
        // str 是点击的修改对象对应的索引值
        const str = adminlist.findIndex((item) => {return item.adminname === value.adminname })
        if (value.role === adminlist[str].role) {
            message.error('您没有修改信息,不需要提交修改!')
        } else {
            updataAdmin(value).then(res => {       
                // 修改成功
                message.success('修改成功!')
                //重新渲染页面  // 重新渲染页面为了优化减少http请求,通过本地的的查询,修改页面的信息
                const arr = JSON.parse( JSON.stringify(adminlist)) //进行深拷贝
                arr[str].role = value.role  //修改role
                setAdminlist(arr) // 再渲染页面
                // 通过请求数据再渲染
                // async function fetchData () {
                //     const res = await getAdminlist()
                //     setAdminlist(res.data.data)
                //     // console.log(res,'789879')
                // }
                // fetchData()
                 // 关闭遮盖层
                setAmentVisible(false)
            })
        }  
    }
    const amend = (adminid) => {
        setAmentVisible(true) //显示弹出层
        // 通过 adminid 获取数据 将数据写入到input标签 再修改
        findAdmin({adminid}).then(res => {
            // console.log(res.data.data[0],'123')
            // 在input上渲染
            console.log(amendRef)
            amendRef.current.setFieldsValue({
                    adminname: res.data.data[0].adminname,
                    role: res.data.data[0].role
                })
        })
    }
    const columns = [
        {
          title: '序号',
          render: (text, record, index) => {
              return(
                  <span>{ (page-1)*pageSize+index+1 }</span>
              )
            
          }
        },
        {
          title: '管理员账号',
          dataIndex: 'adminname',
          key: 'adminname',
        },
        {
          title: '角色',
          dataIndex: 'role',
          key: 'role',
          render: (text, record, index) => {
              return(
                  <>
                  { text === 2 ? <Tag color="green">超级管理员</Tag> : <Tag color="blue">管理员</Tag> }
                  </>
              )
          }
        },
        {
            title: '操作',
           render: (text, record, index) => {  
            return record.adminname==='admin'? null : <Space> 
                    <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => {amend(record.adminid)}}></Button>
                    <Popconfirm
                        title="您确定要删除该管理员吗?"
                        onConfirm={() => {confirm(record.adminid, index)}}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button type="primary" shape="circle" danger icon={<DeleteOutlined />} ></Button>
                    </Popconfirm>
                </Space>
               
           }
        }
      ];
      // 添加管理员字段
      const [ addVisible, setAddVisible ] = useState(false) //设定弹出层的状态
      const addhandleOk = () => {} //点击确定到的回调函数
      const addhandleCancel = () => { setAddVisible(false) } //点击遮罩层或右上角×按钮的回调函数
      const onaddFinish = (value) => {// 添加管理员的提交按钮
          addAdmin(value).then(res => {
             //判断提交的是否成功
             if (res.data.code === '10006') { //失败的判断
                message.error('该管理员账号已存在!');
             } else { //成功 将关闭遮罩层,切清空input
                message.success('提交成功');
                //更新页面的数据
                const arr = [...adminlist,...res.data.data]
                setAdminlist(arr)
                //关闭遮罩层
                setAddVisible(false)
                
                //清空 遮罩层 input
                console.log(addRef.current,'123')
                addRef.current.setFieldsValue({
                    adminname: '',
                    password: '',
                    role: 0
                })
               
             }
          })

        }
        const addRef = useRef() //给from绑定ref,获取input的数据,进行修改
    return (
        <>
        <Button type="primary" style={{marginBottom:'10px'}} onClick={() => { setAddVisible(true) }}>添加管理员</Button>
        <Table dataSource={adminlist} columns={columns} rowkey = { record => record.adminid }
           pagination={{
            onChange:(page,pageSize) => {
                console.log(page,pageSize)
                setPage(page) 
            },
            onShowSizeChange:(current, size) => {
               setPage(current)
               setPageSize(size)  
            }
           }} 
        />
        <Modal
          title="添加管理员"
          visible={addVisible}
          onOk={addhandleOk} //点击确定到的回调函数
          onCancel={addhandleCancel} //点击遮罩层或右上角×按钮的回调函数
          footer={null}
        >
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onaddFinish}
                ref = { addRef }
            >
            <Form.Item
                label="账号"
                name="adminname"
                rules={[{ required: true, message: '请输入管理员账号' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="role"
                label="级别"
                rules={[{ required: true, message: '请选择管理员身份' }]}
            >
                <Radio.Group>
                <Radio.Button value={1}>管理员</Radio.Button>
                <Radio.Button value={2}>超级管理员</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                提交
                </Button>
            </Form.Item>
        </Form>
        </Modal>
        <Modal
          title="修改管理员信息"
          visible={amentVisible}
          onOk={amenthandleOk} //点击确定到的回调函数
          onCancel={amenthandleCancel} //点击遮罩层或右上角×按钮的回调函数
          footer={null}
        >
            <Form
                name="admen"
                initialValues={{ remember: true }}
                onFinish={(value) => { onadmenFinish(value) }}
                ref = { amendRef }
            >
            <Form.Item
                label="账号"
                name="adminname"
                rules={[{ required: true, message: '请输入修改管理员账号' }]}
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                name="role"
                label="级别"
                rules={[{ required: true, message: '请选择管理员身份' }]}
            >
                <Radio.Group>
                <Radio.Button value={1}>管理员</Radio.Button>
                <Radio.Button value={2}>超级管理员</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                修改
                </Button>
            </Form.Item>
        </Form>
        </Modal>
        </>
    )
}

export default Com

