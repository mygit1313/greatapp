'use client'
import React, { useState } from 'react';
import Tabs from '@/components/Tabs/Index';
import ChangePassword from '@/components/Settings/ChangePassword';
import GstSettings from '@/components/Settings/GstSettings';
import DataProtection from '@/components/Settings/DataProtection'
export default function SettingsTab() {

    const tabs = [{
        name: 'GST Settings',
        id: 'gst_settings',
        content: <GstSettings />
    },
    {
        name: 'Data Protection',
        id: 'data_protection',
        content: <DataProtection />
    },
    {
        name: 'Change Password',
        id: 'change_password',
        content: <ChangePassword />
    },
    ];

    return (
        <>
            <Tabs tabs={tabs} defaultSelectedTab="gst_settings" tabTitle="Settings" />
        </>
    )
}