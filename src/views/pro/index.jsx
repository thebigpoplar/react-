// import React, { Component } from 'react'//类组件
import React, { useState, useEffect } from 'react'
import { Table, Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getProlist } from './../../api/pro'
const Index = () => {//函数式组件的方法函数式组件没有生命周期通过
    const [prolist, setProlist] = useState([])
    const [page, setPage] = useState(10)
    const [pageSize,setPageSize] = useState(10)
    useEffect(() => {
        async function getSetdata() {
            const res = await getProlist()
            console.log(res.data.data)
            setProlist(res.data.data)
        }
        getSetdata()

    }, [])
    const columns = [
        {
            title: '序号', algin: 'center',
            render: (text, record, index) => {//text代表proimg字段的值,record代表当前这段值的对象,index代表索引
                return (<span>{(page-1)*pageSize+index}</span>)
            }
        },
        {
            title: '产品名称', dataIndex: 'proname', align: 'center', width: 200,
            filters: [
                {
                    text: '手机',
                    value: '手机',
                },
                {
                    text: '零食',
                    value: '零食',
                },
                {
                    text: '电脑',
                    value: '电脑',
                },
                {
                    text: '化妆品',
                    value: '化妆品',
                },
                {
                    text: '手表',
                    value: '手表',
                },
                {
                    text: '服装',
                    value: '服装',
                }
            ],
            onFilter: (value, record) => record.proname.indexOf(value) !== -1
        },
        {
            title: '产品图片', dataIndex: 'proimg', align: 'center',
            render: (text, record, index) => {//text代表proimg字段的值,record代表当前这段值的对象,index代表索引
                return (<img src={text} alt="" style={{ width: 80, height: 80 }} />)
            }
        },
        {
            title: '产品价格', dataIndex: 'price', align: 'center',
            sorter: {
                compare: (a, b) => a.price - b.price
            }
        },
        {
            title: '产品销量', dataIndex: 'sales', algin: 'center',
            sorter: {
                compare: (a, b) => a.sales - b.sales
            }
        },
        {
            title: '操作', algin: 'center',
            render: (text, record, index) => {//text代表proimg字段的值,record代表当前这段值的对象,index代表索引
                return (
                    <Space>
                        <Button type="primary" shape="circle" icon={<EditOutlined />}></Button>
                        <Button type="primary" shape="circle" danger icon={<DeleteOutlined />}></Button>
                    </Space>
                )
            }
        },
    ]
    return (
        <Table dataSource={prolist} columns={columns} rowKey={(record) => { return (record.proid) }} pagination={{
            position: ["bottomLeft"],
            defaultCurrent:1,
            defaultPageSize:10,
            onChange:(page,pageSize) => {
                console.log(page,pageSize)
                setPage(page)
            },
            onShowSizeChange:(current, size) => {
                console.log(current, size,'hah')
                setPage(current)
                setPageSize(size)
            }
        }} />//rowKey是设定的key值,record为当前字段的对象
        // <div>
        //     详情列
        //     {
        //         prolist.map(item => {
        //             return (<div key={item.proid}> {item.proname} </div>)
        //         })
        //     }
        // </div>
    );
}

export default Index;

// import React, { Component } from 'react';//类组件的方法
// import { getProlist } from './../../api/pro'

// class Index extends Component {
//     state = { prolist: [] }
//     async componentDidMount() {
//         const res = await getProlist()
//         console.log(res)
//         this.setState({
//             prolist: res.data.data
//         })
//     }
//     columns = [
//         {
//             title: '序号'
//         },
//         {
//             title: '产品名称'
//         },
//         {
//             title: '产品图片'
//         },
//         {
//             title: '产品销量'
//         },
//         {
//             title: '操作'
//         },
//     ]
//     render() {
//         return (
//             <Table dataSource={this.state.prolist} columns={this.columns} />
//         );
//     }
// }

// export default Index;
