import React from 'react';

import HeroBannerSlider from '../Banner/HeroBannerSlider';
import PremiumMembers from '../premiummember/PremiumMember';
import HowItWorks from '../premiummember/HowItWorks/HowItWorks';
import SuccessCounterSection from './successcounter/SuccessCounterSection';
import SuccessStories from '../SuccessStories/SuccessStories';
import CallToAction from './Calltoaction/CallToAction';
import OurServices from './OurServices/OurServices';
import HeartBridgeFeatures from './Features/Features';

const Home = () => {
    return (
        <div>
            <HeroBannerSlider></HeroBannerSlider>
            <PremiumMembers></PremiumMembers>
            <OurServices></OurServices>


            <HowItWorks></HowItWorks>
            <SuccessCounterSection></SuccessCounterSection>
            <HeartBridgeFeatures></HeartBridgeFeatures>
            <SuccessStories></SuccessStories>
            <CallToAction></CallToAction>

           
        </div>
    );
};

export default Home;