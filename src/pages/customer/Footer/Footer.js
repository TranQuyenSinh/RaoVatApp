import React from 'react'
import './Footer.scss'
import logo_fb from '@assets/images/facebook.svg'
import logo_yt from '@assets/images/youtube.svg'
import logo_cert from '@assets/images/certificate.webp'
import qr from '@assets/images/group-qr.webp'
const Footer = () => {
    return (
        <div className='customer-footer'>
            <div className='top row'>
                <div className='col-3'>
                    <div className='title'>Tải ứng dụng</div>
                    <img src={qr} width={100} height={100} />
                </div>
                <div className='col-3'>
                    <div className='title'>Hỗ trợ khách hàng</div>
                    <ul className='list-unstyled'>
                        <li>
                            <a href='#'>Trung tâm trợ giúp</a>
                        </li>
                        <li>
                            <a href='#'>An toàn mua bán</a>
                        </li>
                        <li>
                            <a href='#'>Liên hệ hỗ trợ</a>
                        </li>
                    </ul>
                </div>
                <div className='col-3'>
                    <div className='title'>Về Rao vặt</div>
                    <ul className='list-unstyled'>
                        <li>
                            <a href='#'>Giới thiệu</a>
                        </li>
                        <li>
                            <a href='#'>Quy chế hoạt động sàn</a>
                        </li>
                        <li>
                            <a href='#'>Chính sách bảo mật</a>
                        </li>
                        <li>
                            <a href='#'>Giải quyết tranh chấp</a>
                        </li>
                        <li>
                            <a href='#'>Tuyển dụng</a>
                        </li>
                        <li>
                            <a href='#'>Truyền thông</a>
                        </li>
                        <li>
                            <a href='#'>Blog</a>
                        </li>
                    </ul>
                </div>
                <div className='col-3'>
                    <div className='title'>Liên kết</div>
                    <div className='icons d-flex gap-2'>
                        <img src={logo_fb} />
                        <img src={logo_yt} />
                    </div>
                    <div className='title mt-3'>Chứng nhận</div>
                    <img src={logo_cert} />
                </div>
            </div>
            <div className='bottom'>
                <div>
                    CÔNG TY TNHH CHỢ TỐT - Người đại diện theo pháp luật: Nguyễn Trọng Tấn; GPDKKD: 0312120782 do sở KH
                    & ĐT TP.HCM cấp ngày 11/01/2013;
                </div>
                <div>
                    GPMXH: 17/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 15/01/2019 - Chịu trách nhiệm nội dung:
                    Trần Minh Ngọc. Chính sách sử dụng
                </div>
                <div>
                    Địa chỉ: Tầng 18, Toà nhà UOA, Số 6 đường Tân Trào, Phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh,
                    Việt Nam; Email: trogiup@chotot.vn - Tổng đài CSKH: 19003003 (1.000đ/phút)
                </div>
            </div>
        </div>
    )
}

export default Footer
