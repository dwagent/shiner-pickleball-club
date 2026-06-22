import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-gray-50 text-gray-700 mt-8 border-t">
      <div className="container mx-auto px-4 py-6 grid md:grid-cols-2 gap-4 items-center">
        <div>
          <div className="font-semibold">Shiner Pickleball Club</div>
          <div className="text-sm">123 Main St, Shiner, TX • (979) 555-0123</div>
        </div>
        <div className="text-right text-sm">© {new Date().getFullYear()} Shiner Pickleball Club</div>
      </div>
    </footer>
  )
}
