/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return [
        {
            name: 'Home',
            url: null,
            children: [
                {
                    name: 'Dashboard',
                    url: 'dashboard'
                }
            ]
        },
        {
            name: 'Posts',
            url: null,
            children: [
                {
                    name: 'Posts List',
                    url: 'posts'
                },
                {
                    name: 'Post',
                    url: 'post'
                },
                {
                    name: 'Tags',
                    url: 'tags'
                },
                {
                    name: 'Tag',
                    url: 'tag'
                }
            ]
        },
        {
            name: 'Comments',
            url: null,
            children: [
                {
                    name: 'Comments List',
                    url: 'comments'
                },
                {
                    name: 'Comment',
                    url: 'comment'
                }
            ]
        },
        {
            name: 'Users',
            url: null,
            children: [
                {
                    name: 'Users List',
                    url: 'users'
                },
                {
                    name: 'User',
                    url: 'user'
                },
                {
                    name: 'Roles List',
                    url: 'roles'
                },
                {
                    name: 'Role',
                    url: 'role'
                }
            ]
        },
        {
            name: 'Settings',
            url: null,
            children: [
                {
                    name: 'Settings List',
                    url: 'settings'
                },
                {
                    name: 'Setting',
                    url: 'setting'
                }
            ]
        }
    ];
});
