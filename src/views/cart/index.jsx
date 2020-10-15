import React, { Component } from 'react';
import {getCartlist} from './../../api/cart'
import {Table} from 'antd'
class index extends Component {
    state = { carlist: [] }
    async componentDidMount() {
        const res = await getCartlist()
        console.log(res,'123')
        this.setState({
            carlist: res.data.data
        })
    }
    columns = [
        {
          title: '序号',
          render: (text, record, index) => {
              return(<span>{index+1}</span>)
          }
        },
        {
          title: '用户选中的状态',
          width:90,
          dataIndex: 'flag',
          key: 'flag',
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '手机号',
          dataIndex: 'tel',
          key: 'tel',
        },
        {
          title: '产品名称',
          dataIndex: 'proname',
          width:200,
          key: 'proname',
        },
        {
          title: '产品图片',
          dataIndex: 'proimg',
          key: 'pronimg',
          render:(text, record, index) => {
              return (
                  <img src={text} alt="" style={{width:'80px',height:'80px'}}/>
              )
          }
        },
        {
            title: '产品价格',
            dataIndex: 'price',
            key: 'price',
          }, {
            title: '数量',
            dataIndex: 'num',
            key: 'num',
          },
      ]
    render() {
        return (
            <Table dataSource={this.state.carlist} columns={this.columns} />
        );
    }
}

export default index;
