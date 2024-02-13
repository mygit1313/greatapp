"use client"
import { usePathname } from 'next/navigation';
import AdminLayout from '@/components/layouts/AdminTemplate';
import AuthUserTemplate from '@/components/layouts/AuthUserTemplate';
import FrontendTemplate from '@/components/layouts/FrontendTemplate';
const CombinedLayout = (props) => {
    const { childrenData } = props;
    const pathname = usePathname();
    const urlArray = (pathname.split("/"));
    return (
        <>
            {urlArray && urlArray.length > 1 && urlArray[1] == 'user' ?
                <AuthUserTemplate childrenData={childrenData} /> :
                (urlArray && urlArray.length > 1 && urlArray[1] == 'admin' ?
                    <AdminLayout childrenData={childrenData} /> :
                    urlArray && urlArray.length > 1 && urlArray[1] != 'user' && urlArray[1] != 'admin' &&
                    <FrontendTemplate childrenData={childrenData} />)}
        </>
    )
}
export default CombinedLayout;