import { Counter } from '../components/Counter'
import Home from '../pages/customer/Home'
import DetailAd from '../pages/customer/DetailAd/DetailAd'
import PostAdForm from '../pages/customer/PostAd/PostAdForm'
import { SpecifyGenre } from '../pages/customer/SpecifyGenre/SpecifyGenre'
import SearchAd from '../pages/customer/SearchAd/SearchAd'
import ManageAd from '../pages/customer/ManageAd/ManageAd'
import AccountSetting from '../pages/customer/AccountSetting/AccountSetting'
import SavedAd from '../pages/customer/SavedAd/SavedAd'
import EditAdForm from '../pages/customer/PostAd/EditAdForm'

export const CustomerPublicRoutes = [
    {
        index: true,
        element: <Home />,
    },
    {
        path: 'tin-dang/:adId',
        element: <DetailAd />,
    },
    {
        path: ':genreSlug',
        element: <SpecifyGenre />,
    },
    {
        path: 'search',
        element: <SearchAd />,
    },
]

export const CustomerPrivateRoutes = [
    {
        path: 'counter',
        element: <Counter />,
    },
    {
        path: 'dang-tin',
        element: <PostAdForm />,
    },
    {
        path: 'sua-tin/:adId',
        element: <EditAdForm />,
    },
    {
        path: 'quan-ly-tin',
        element: <ManageAd />,
    },
    {
        path: 'settings',
        element: <AccountSetting />,
    },
    {
        path: 'saved-ads',
        element: <SavedAd />,
    },
]
