import React from "react";

const Filter = () => {
  return (
    <div id="filter" className="relative z-10 -mt-16 mx-auto w-[90%] max-w-3xl bg-[#00000080] p-5 rounded-2xl backdrop-blur shadow-xl">
      <h2 className="text-white font-bold text-2xl mb-3 text-center">
        424,816 عقار للبيع و للايجار
      </h2>
      <form action="" className="w-full mx-auto">
  <div>
    <input
      type="text"
      className=" rounded-2xl p-2 w-full mb-4 bg-white"
      placeholder="المدينة أو الحي أو إسم الشارع"
    />
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
    <div className="relative">
      <select className="appearance-none w-full bg-white p-2 px-3 rounded-xl" name="" id="">
        <option value="">للإيجار</option>
        <option value="">للبيع</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <div className="relative">
      <select className="appearance-none w-full bg-white p-2 px-3 rounded-xl" name="" id="">
        <option value="">شقق</option>
        <option value="">شقق مفروشة</option>
        <option value="">فلل</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <div className="flex gap-2">
      <div className="relative w-full">
        <select className="appearance-none w-full bg-white p-2 px-3 rounded-xl" name="min-area" id="">
          <option value="">المساحة من</option>
          <option value="50">50 م²</option>
          <option value="100">100 م²</option>
          <option value="150">150 م²</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="relative w-full">
        <select className="appearance-none w-full bg-white p-2 px-3 rounded-xl" name="max-area" id="">
          <option value="">إلى</option>
          <option value="100">100 م²</option>
          <option value="150">150 م²</option>
          <option value="200">200 م²</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <div className="flex gap-2">
      <div className="relative w-full">
        <select className="appearance-none w-full bg-white p-2 px-3 rounded-xl" name="min-price" id="">
          <option value="">السعر من</option>
          <option value="1000">1000 جنيه</option>
          <option value="3000">3000 جنيه</option>
          <option value="5000">5000 جنيه</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="relative w-full">
        <select className="appearance-none w-full bg-white p-2 px-3 rounded-xl" name="max-price" id="">
          <option value="">إلى</option>
          <option value="3000">3000 جنيه</option>
          <option value="5000">5000 جنيه</option>
          <option value="10000">10000 جنيه</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <button className="hover:bg-[#375963] bg-[var(--bg-main)] transition-all cursor-pointer w-full text-white px-4 py-2 rounded-full mt-2">
    بحث
  </button>
</form>



    </div>
  );
};

export default Filter