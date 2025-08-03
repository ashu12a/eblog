import React from 'react'
import { IoWarning } from 'react-icons/io5'

export default function Maintenance() {
  return (
    <div className="fixed z-50 top-0 left-0 right-0 bottom-0 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header Section */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <IoWarning size={40} className='text-red-500' />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            We're Making Things Better
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our team is working hard to improve your experience. We'll be back soon with exciting new features and improvements.
          </p>
        </div>

       
        
        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Stay Connected</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Updates</h3>
              <p className="text-sm text-gray-600 mb-4">Get notified when we're back online</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Need immediate assistance?</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                Chat Now
              </button>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  )
}
