import React from 'react';

import HeroBannerSlider from '../Banner/HeroBannerSlider';
import PremiumMembers from '../premiummember/PremiumMember';
import HowItWorks from '../premiummember/HowItWorks/HowItWorks';
import SuccessCounterSection from './successcounter/SuccessCounterSection';
import SuccessStories from '../SuccessStories/SuccessStories';

const Home = () => {
    return (
        <div>
            <HeroBannerSlider></HeroBannerSlider>
            <PremiumMembers></PremiumMembers>
            <HowItWorks></HowItWorks>
            <SuccessCounterSection></SuccessCounterSection>
            <SuccessStories></SuccessStories>
          
           
        </div>
    );
};

export default Home;