"use client";

import Image from "next/image";

export default function DetailTable({ order }) {
  return (
    <div className="space-y-5">
      <div className="max-w-[500px] space-y-5 rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="grid grid-cols-3">
          <div className="col-span-1">Email</div>
          <div className="col-span-1">:</div>
          <div className="col-span-1">{order.user.email}</div>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1">Name</div>
          <div className="col-span-1">:</div>
          <div className="col-span-1">{order.user.name}</div>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1">Address</div>
          <div className="col-span-1">:</div>
          <div className="col-span-1">{order.address}</div>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1">Postal Code</div>
          <div className="col-span-1">:</div>
          <div className="col-span-1">{order.postal_code}</div>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1">Payment Method</div>
          <div className="col-span-1">:</div>
          <div className="col-span-1">{order.payment_method}</div>
        </div>
      </div>

      <div className="overflow-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="grid grid-cols-3 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Product</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">Price</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">Quantity</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Color</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">Created At</p>
          </div>
        </div>
      </div>

      {order.order_items.map((item, key) => (
        <div
          className="grid grid-cols-3 border-t border-stroke bg-white px-4 py-4.5 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12.5 w-15 overflow-hidden rounded-md">
              <Image
                src={`/uploads/${item.product.images[0]}`}
                width={60}
                height={50}
                alt="Product"
              />
            </div>
            <p className="text-sm text-black dark:text-white">
              {item.product.title}
            </p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {item.product.price}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {item.quantity}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div
                style={{
                  backgroundColor: item.color,
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  marginRight: 10,
                }}
              />
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {item.created_at.toDateString()}
            </p>
          </div>
        </div>
      ))}
      {order.order_items.length === 0 && (
        <div className="flex h-[500px] items-center justify-center text-center">
          No Data
        </div>
      )}
    </div>
  );
}
