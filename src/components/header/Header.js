import React from 'react';
import * as classes from './Header.module.scss';
import { PageHeader, Menu } from 'antd';
import { SnippetsOutlined, CodeOutlined, BarChartOutlined, LogoutOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
// import { MenuItem } from './menuitem/MenuItem';

class Header extends React.Component {

    state = {
        current: window.location.pathname
    };

    navigate = e => {
        // console.log(e);
        this.props.history.push(e.key);
        if (e.key === '/login') {
            localStorage.clear();
        } else {
            this.setState({ current: window.location.pathname });
        }
    };

    render() {
        // console.log(this.props);\

        /* let menuitems = [
            { label: 'Dashboard', path: '/dashboard', icon: <BarChartOutlined /> },
            { label: 'Students', path: '/students', icon: <TeamOutlined /> },
            { label: 'Courses', path: '/courses', icon: <CodeOutlined /> },
            { label: 'Certificates', path: '/certificates', icon: <TrophyOutlined /> },
            { label: 'Exams', path: '/exams', icon: <SnippetsOutlined /> }
        ]; */

        const { current } = this.state;
        const menu = (
            <Menu onClick={this.navigate} selectedKeys={[current]} mode="horizontal" theme="dark">
                {/* {menuitems.map((item, key) => {
                    return (
                        <MenuItem
                            key={key}
                            label={item.label}
                            path={item.path}
                            icon={item.icon}
                        ></MenuItem>
                    )
                })} */}
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
                <Menu.Item key="/login" icon={<LogoutOutlined />} className={classes.Logout}>
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