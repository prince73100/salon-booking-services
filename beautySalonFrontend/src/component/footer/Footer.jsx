import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
    return (
        <div className='footerContainer'>
            <div className="footerSuBcontainer">
                <div className='header-logo'>
                    <Link to={'/'}><img src="https://res2.weblium.site/res/5c938446fb27710024481fb9/5cd055827ec61c0023cabda8_optimized.webp" alt="" /></Link>
                </div>
                <div>
                   <div><Link>Home</Link></div>
                   <div><Link>Service</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Footer
