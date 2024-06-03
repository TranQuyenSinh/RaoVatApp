import DetailGenre from '@pages/admin/GenreManage/DetailGenre'
import GenreManage from '../pages/admin/GenreManage/GenreManage'
import { Navigate } from 'react-router-dom'
import ApproveAd from '@pages/admin/ApproveAd/ApproveAd'
import BannerManage from '@pages/admin/BannerManage/BannerManage'
import AccountManage from '@pages/admin/AccountManage/AccountManage'
export const SystemPrivateRoutes = [
   {
      index: 'admin',
      element: <Navigate to={'/admin/approve-ad'} />,
   },
   {
      path: 'approve-ad',
      element: <ApproveAd />,
   },
   {
      path: 'genres',
      element: <GenreManage />,
   },
   {
      path: 'genres/:genreId',
      element: <DetailGenre />,
   },
   {
      path: 'banners',
      element: <BannerManage />,
   },
   {
      path: 'accounts',
      element: <AccountManage />,
   },
]
