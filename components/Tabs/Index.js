"use client"
import { useState } from "react"
const Tabs = (props) => {
    const { tabs, defaultSelectedTab, tabTitle } = props;
    const [selectedTab, setSelectedTab] = useState(defaultSelectedTab)

    return (
        <div className="shadow">
            <div className='bg-black flex items-center p-5'>
                <h2 className="text-[#f9bc60] text-lg font-medium">{tabTitle}</h2>
            </div>
            <div className='bg-white sm:p-2 lg:p-5'>
                <div>
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <ul className="z-10 flex lg:flex-wrap -mb-px text-base font-medium text-center relative overflow-x-auto sm:rounded-lg" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                            {tabs.map((tab, index) => (
                                <li className="mr-2" role="presentation" key={index} onClick={() => setSelectedTab(tab.id)}>
                                    <button className={`${selectedTab == tab.id && 'border-b-2 rounded-t-lg text-[rgb(249,188,96)] hover:text-[rgb(249,188,96)] dark:text-[rgb(249,188,96)] dark:hover:text-[rgb(249,188,96)] border-[rgb(249,188,96)] dark:border-[rgb(249,188,96)]" '}  p-4 rounded-t-lg w-max`} id={`${tab.id}-tab`} data-tabs-target={`#${tab.id}`} type="button" role="tab" aria-controls={tab.id} aria-selected="false">{tab.name}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id="myTabContent" className="mt-4">
                        {tabs.map((tab, index) => (
                            <div key={index} className={`${selectedTab != tab.id && 'hidden '} p-4 rounded-lg`} id={tab.id} role="tabpanel" aria-labelledby={`${tab.id}-tab`}>
                                {tab.content}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tabs;