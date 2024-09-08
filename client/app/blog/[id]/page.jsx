import React from 'react'
const page = () => {
  return (
        <div className='  p-5    md:pt-24'>
        <div className='font-extrabold max-w-md text-3xl items-center m-auto   text-blue-850 text-center'>
        The Biggest Losers of a (likely) Nixed NBA Season
        <div className='text-xs justify-between py-4 px-8 flex flex-row text-black' >
        By Diwansh Gupta<span className='text-gray-400'> - Mar-1,2024</span>
        </div>
        </div>
            <div className='md:w-2/3 justify-center m-auto rounded-md ' >
                <img src='/assets/visax-5jgvVlkI0mw-unsplash.jpg' className='w-full rounded-md h-fit md:h-96'/>
                <div className='py-4 font-medium border-b-2 text-start gap-5 w-10/12 justify-center m-auto'>
                <p>1 Bucks vs 8 Magic</p>
                This series will prob go past 5 games, as the Nets were the Team that snapped Raptors 15 game winnings streak in a game in Brooklyn, but regardless the Raptors won the season series 3-1, but in every game you saw the Nets put up a good fight.
                Deep down, you look down the roster, and by the time playoff start, you will have a healthy Toronto Raptors, as this past season, Raptors lost so many man games to injury, as basically the starting lineup went through a series of injury as Siakam, Lowry, Vanfleet, Powell, Ibaka, Gasol all were injured at one point during the season, and still ended up as of today, as the second seed as 46-18 and a 15 game winning streak after losing Danny Green and Kawhi Leonard in Free Agency.
                </div>
                <div className='w-10/12  justify-center m-auto py-6'>
                    <h2 className='text-2xl font-semibold '>Comments</h2>
                    <div className='flex gap-4 border-b-2 pb-4  flex-row'>
                    <div className=''>
                    <img src='/assets/johnny-vargas-9oocgcNo4_0-unsplash.jpg' className='w-16 h-12 object-cover rounded-md  '/>
                    </div>
                    <div className='w-full  gap-5'>
                        <textarea className='outline-none mb-3 p-3 rounded-md h-16 w-full border-2' placeholder='Write a comment...'/>
                        <span className='m-auto p-1 px-5 text-sm  rounded-full border-2 font-semibold border-gray-400'>
                            Submit
                        </span>
                    </div>
                    </div>
                    <div className='flex gap-4  p-3 border-b-2 pb-4 flex-row'>
                    <div className=''>
                    <img src='/assets/samsung-memory-o4oYRBB1BEg-unsplash.jpg' className='w-16 select-none object-cover h-12 rounded-md '/>
                    </div>
                    <div className='w-full  '>
                        <div className=''>
                            <h2 className='font-semibold'>Diwansh gupta</h2>
                            <p className='py-2 text-xs'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium magnam fugit molestiae quae itaque at minus inventore quasi sit, omnis dignissimos, cum illo. Optio debitis earum esse ad facere!
                            </p>
                            <span className='text-gray-400 text-sm'>20 august 2024   1:45 pm</span>
                        </div>
                       
                    </div>
                    </div>
                </div>
                
            </div>
 
        </div>

  )
}

export default page