import React, { useEffect, useState } from 'react';
import { getAllUserOrders, updateStatus } from '../../api/order';
import Loader from '../../utiles/Loader';
import LargeButton from '../../utiles/LargeButton';
import Modal from '../../utiles/Modal';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orderStatus, setOrderStatus] = useState(selectedOrder?.orderStatus);
  const [paymentStatus, setPaymentStatus] = useState(selectedOrder?.paymentStatus);

  const [updateStatusLoading, setUpdateStatusLoading] = useState(false)

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getAllUserOrders();
      setOrders(response.data);
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOrderStatus(order.orderStatus);
    setPaymentStatus(order.paymentStatus);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId) => {
    setUpdateStatusLoading(true)
    const data = {
      orderId,
      paymentStatus,
      orderStatus
    }
    try {
      const response = await updateStatus(data);
      toast.success(response.message)
      fetchOrders();
    } catch (error) {
      console.error(error)
    } finally {
      setUpdateStatusLoading(false)
    }
  };

  return (
    <div className="font-bodyFont p-4">
      <h2 className="font-semibold text-2xl text-center mb-6">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="text-gray-700">
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">User Email</th>
              <th className="py-2 px-4 border-b">User Name</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Order Status</th>
              <th className="py-2 px-4 border-b">Payment Status</th>
              <th className="py-2 px-4 border-b">Total Amount</th>
              <th className="py-2 px-4 border-b">Ordered On</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  <Loader />
                </td>
              </tr>
            ) : orders?.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="text-gray-700 hover:bg-gray-100 text-[14px]">
                  <td className="py-2 px-4 border-b">{order._id}</td>
                  <td className="py-2 px-4 border-b">{order.userId?.email}</td>
                  <td className="py-2 px-4 border-b">{order.userId?.fullName}</td>
                  <td className="py-2 px-4 border-b">{order.address?.phone}</td>
                  <td className="py-2 px-4 border-b">{order.orderStatus}</td>
                  <td className="py-2 px-4 border-b">{order.paymentStatus}</td>
                  <td className="py-2 px-4 border-b">{order.totalAmount}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <LargeButton onClick={() => handleViewOrder(order)} text="View" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} closeModal={() => { setIsModalOpen(false); setSelectedOrder(null) }} heading="Order Details" width="60%" height="90%">
        {selectedOrder && (
          <div className="pt-[10px] flex flex-col gap-[5px] font-bodyFont text-[14px]">
            <h3 className="font-semibold text-[18px]">Order ID: {selectedOrder._id}</h3>
            <div>
              <h4 className="font-semibold text-[18px]">Shipping Address:</h4>
              <p>{selectedOrder.address?.fullName}</p>
              <p>{selectedOrder.address?.street}, {selectedOrder.address?.city}, {selectedOrder.address?.state} - {selectedOrder.address?.zipCode}</p>
              <p>Email: {selectedOrder.address?.email}</p>
              <p>Phone: {selectedOrder.address?.phone}</p>
            </div>

            <div>
              <h4 className="font-semibold text-[18px]">Order Items:</h4>
              <ul>
                {selectedOrder.items.map((item) => (
                  <li key={item._id} className="mb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <img
                          src={item.productId.imageUrl[0]}
                          alt={item.productId.name}
                          className="w-12 h-12 object-cover mr-4"
                        />
                        <span>{item.productId.name}</span>
                      </div>
                      <span>{item.quantity} x ₹{item.price}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex gap-[5px] flex-col '>
              <h4 className="font-semibold text-lg">Order Summary:</h4>
              <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
              <p><strong>Order Status:</strong> {selectedOrder.orderStatus}</p>
              <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
            </div>

            {/* Order Status */}
            <div className='flex w-[35%] justify-between'>
              <label htmlFor="orderStatus" className="font-semibold">Order Status</label>
              <select
                id="orderStatus"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="p-2 border border-gray-300 rounded-md outline-none"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Payment Status */}
            <div className="flex w-[35%] justify-between">
              <label htmlFor="paymentStatus" className="font-semibold">Payment Status</label>
              <select
                id="paymentStatus"
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="p-2 border border-gray-300 rounded-md outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <LargeButton isLoading={updateStatusLoading} onClick={() => updateOrderStatus(selectedOrder._id)} text="Update" />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrders;