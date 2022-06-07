import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Products = ({ products, loading }) => {

    const [searchPro, setSearchPro] = useState("")
    if (loading) {
        return (
            <h2>LOADING..</h2>
        )
    }
    function deletepro(id) {
        axios.delete(`https://62811baf1020d8520585969c.mockapi.io/api/v1/products/${id}`)
            .then(res => {
                window.location.reload(true);
            })
    }

    return (
        <>
            <thead>
                <tr>

                    <th colspan={3}> <form id="tim">
                        <i class="bx bx-search icon"></i>
                        <input className='input-field' type="text" name="search" placeholder="Tìm kiếm..." onChange={(event) => { setSearchPro(event.target.value) }} />
                    </form></th>
                    <th ></th>
                    <th></th>



                </tr>
            </thead>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Hình ảnh </th>
                    <th>Tên thú cưng</th>
                    <th>Loại</th>
                    <th>Trạng Thái</th>
                    <th>Giá</th>
                    <th>Hành động</th>

                </tr>
            </thead>
            <tbody>


                {products.filter((pro) => {
                    if (searchPro == "") {
                        return pro
                    } else if (pro.name.toLowerCase().includes(searchPro.toLowerCase())) {
                        return pro
                    }
                }).map((pro, index) => {
                    return (
                        <tr key={index}>
                            <td >{pro.id}</td>
                            <td>
                                <div className="order-owner">
                                    <img src={pro.imageUrl} alt="user image" />

                                    <span></span>
                                </div>
                            </td>
                            <td>
                                <span>{pro.name}</span>
                            </td>
                            <td>{pro.breed}</td>

                            <td>
                                <span className={pro.status === "Còn hàng" ? 'order-status order-ready' :
                                    'order-status order-shipped'}> {pro.status === "Còn hàng" ? 'Còn hàng' : 'Hết hàng'}</span>
                            </td>

                            <td>{pro.price}</td>
                            <td>
                                <div className="manage">

                                    <Link to={`/editProduct/${pro.id}`}><i className='bx bx-edit bx-md'></i></Link>
                                    <button
                                        className="delete button"
                                        onClick={() => {
                                            const confirmBox = window.confirm(
                                                "Ban co muon xoa san pham nay?"
                                            )
                                            if (confirmBox === true) {
                                                deletepro(pro.id)
                                            }
                                        }}><i className='bx bx-trash bx-md'></i>
                                    </button>
                                </div>
                            </td>
                        </tr>

                    )

                })}
            </tbody>
        </>

    );
};

export default Products;
