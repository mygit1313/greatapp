'use client'
import React from 'react';
import SettingsTab from '@/components/Settings/Index';

export default function Settings() {
    return (
        <div className="grid grid-cols-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <SettingsTab />
        </div>
    )
}