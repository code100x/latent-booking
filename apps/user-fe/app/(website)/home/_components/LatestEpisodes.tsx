import React from 'react'
import banner from "../../../../public/assests/img/ban.png";
import Image from "next/image";
const LatestEpisodes = () => {
  return (

    <div className=" latest_episodes mt-[90px]">
    <div className=" flex items-center justify-between">
      <p className=" font-manrope text-[30px] font-bold mb-6">
        Latent Episodes
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 20 21"
        fill="none"
        className="mr-10"
      >
        <path
          d="M14.4132 11.1632L8.16325 17.4132C7.98713 17.5894 7.74826 17.6883 7.49918 17.6883C7.25011 17.6883 7.01124 17.5894 6.83512 17.4132C6.659 17.2371 6.56006 16.9983 6.56006 16.7492C6.56006 16.5001 6.659 16.2612 6.83512 16.0851L12.4218 10.5L6.83668 4.91325C6.74948 4.82604 6.6803 4.72251 6.63311 4.60857C6.58591 4.49463 6.56162 4.37251 6.56162 4.24918C6.56162 4.12586 6.58591 4.00374 6.63311 3.8898C6.6803 3.77586 6.74948 3.67233 6.83668 3.58512C6.92389 3.49792 7.02742 3.42874 7.14136 3.38155C7.2553 3.33435 7.37742 3.31006 7.50075 3.31006C7.62408 3.31006 7.7462 3.33435 7.86014 3.38155C7.97408 3.42874 8.0776 3.49792 8.16481 3.58512L14.4148 9.83512C14.5021 9.92232 14.5713 10.0259 14.6185 10.1399C14.6657 10.2539 14.6899 10.3761 14.6898 10.4995C14.6896 10.6229 14.6651 10.745 14.6177 10.8589C14.5702 10.9728 14.5008 11.0763 14.4132 11.1632Z"
          fill="white"
        />
      </svg>
    </div>
    <div className=" flex items-center space-x-4">
      <div>
        <Image src={banner} alt="banner" />
        <p className=" text-lg font-medium">
          India’s Got Latent ft. @Ashish Chanchalani, @Beer Biceps, @Rebel
          Kid
        </p>
      </div>

      <div>
        <Image src={banner} alt="banner" />
        <p className=" text-lg font-medium text-[#F5F5F5]">
          India’s Got Latent ft. @Ashish Chanchalani, @Beer Biceps, @Rebel
          Kid
        </p>
      </div>

      <div>
        <Image src={banner} alt="banner" />
        <p className=" text-lg font-medium text-[#F5F5F5]">
          India’s Got Latent ft. @Ashish Chanchalani, @Beer Biceps, @Rebel
          Kid
        </p>
      </div>
    </div>
  </div>
  )
}

export default LatestEpisodes