import React, { useState } from 'react';
import * as classes from './Header.module.scss';
import { PageHeader, Menu, DropDown, Row, Button } from 'antd';
import { SnippetsOutlined, CodeOutlined, BarChartOutlined, CalenderOutlined, TeamOutlined, UserAddOutlined, TrophyOutlined, LogoutOutlined } from '@ant-design/icons';

class Header extends React.Component {

    state = {
        current:  window.location.pathname
    };

    navigate = e => {
        // console.log(e);
        this.props.history.push(e.key);
        if (e.key == '/login') {
            localStorage.clear();
        } else {
            this.setState({ current: window.location.pathname });
        }
    };
    
    render() {
        // console.log(this.props);
        // console.log(window.location)

        const { current } = this.state;
        const menu = (
            <Menu onClick={this.navigate} selectedKeys={[current]} mode="horizontal" theme="dark">
                <Menu.Item key="/dashboard" icon={<BarChartOutlined />}>
                    Dashboard
                </Menu.Item>
                <Menu.Item key="/students" icon={<TeamOutlined />}>
                    Students
                </Menu.Item>
                <Menu.Item key="/courses" icon={<CodeOutlined />}>
                    Courses
                </Menu.Item>
                <Menu.Item key="/certificates" icon={<TrophyOutlined />}>
                    Certificates
                </Menu.Item>
                <Menu.Item key="/exams" icon={<SnippetsOutlined />}>
                    Exams
                </Menu.Item>
                <Menu.Item key="/login" icon={<LogoutOutlined />} style={{float: 'right'}}>
                    Logout
                </Menu.Item>
            </Menu>
        )
        return (
            <PageHeader className={classes.AppHeader}>
                {menu}
            </PageHeader>
        );
    }
}

export default Header;