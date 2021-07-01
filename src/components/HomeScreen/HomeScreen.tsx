import React, { useEffect, useState, useRef } from 'react';
//assets
import ImagePlaceholder from '../../assets/bg-placeholder.jpg';
//components
import FilmPlayer from './FilmPlayer';
import HeaderComponent from './HeaderComponent';
import Message from '../utils/Message';
//material-ui
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const HomeScreen: React.FC = () => {

    //types
    type Media = {
        MediaId: number,
        Title?: string,
        Description?: string,
        MediaTypeCode?: string,
        MediaTypeDisplayName?: string,
        StreamId?: string,
        Provider?: string,
        ContentUrl: string
    }


    type Images = {
        Height?: number,
        Id?: number,
        ImageTypeCode?: string,
        MediaId?: number,
        PlatformCode?: string,
        Url?: string,
        Width?: number
    }

    //interfaces
    interface IMovie {
        AvailableFrom?: string,
        Description?: string,
        Duration?: number,
        Guid?: string,
        Id: number
        Images?: Images[] | undefined,
        IsTrialContentAvailable?: boolean,
        MediaAgeRestrictionImageUrl?: string,
        MediaAgeRestrictionValueMin?: number,
        MediaTypeCode?: string,
        MediaTypeDisplayName?: string,
        Products?: [],
        Title: string,
        Year?: number
    }


    const mediaRowEl = useRef<HTMLDivElement | null>(null);
    const [mediaList, setMediaList] = useState<IMovie[]>([]);
    const [open, setOpen] = useState(false);
    const [mediaInfo, setMediaInfo] = useState<Media | undefined>();
    const [error, setError] = useState(false);

    //media list
    const getMediaList = async (mediaListId: number) => {
        try {
            const url = 'https://thebetter.bsgroup.eu/Media/GetMediaList';
            const header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('jwtTokenBSG') };
            const bodyObject: any = {
                'MediaListId': mediaListId,
                'IncludeCategories': false,
                'IncludeImages': true,
                'IncludeMedia': false,
                'PageNumber': 1,
                'PageSize': 15
            };
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(bodyObject),
                headers: header
            });

            const data = await response.json();
            setMediaList(data.Entities);
            console.log(data);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    //get media list on first mount
    useEffect(() => {
        getMediaList(3);
    }, []);


    //get frame image
    const filterImage = (images: any) => {
        let item = images.filter(x => x.ImageTypeCode === "FRAME");
        if (item.length > 0) {
            return item[0].Url
        } else {
            return ' ';
        };
    };

    // slider 
    let count = 0;
    const handleSlider = (x: string) => {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const imageEl: any = document.getElementsByClassName('homeScreenColImage')[0];
        const imageElWidth: number = imageEl.offsetWidth;
        if (mediaRowEl.current && ((imageElWidth * mediaList.length) > ((count + 1) * windowWidth)) && x === '-') {
            count++;
            mediaRowEl.current.style.transform = `translateX(-${count * windowWidth}px)`;
        };
        if (mediaRowEl.current && x === '+' && mediaRowEl.current.style.transform !== 'translateX(0px)') {
            count--;
            mediaRowEl.current.style.transform = `translateX(${count * -windowWidth}px)`;
        };
    };

    //get movie
    const getPlayInfo = async (mediaId: number) => {
        setOpen(!open);
        try {
            const url = 'https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo';
            const header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('jwtTokenBSG') };
            const bodyObject: any = {
                "MediaId": mediaId,
                "StreamType": "TRIAL"
            };
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(bodyObject),
                headers: header
            });
            const data = await response.json();
            setMediaInfo(data);
        } catch (error) {
            console.log(error);
        };
    };
    //open movie
    const openHandler = () => {
        setOpen(false);
    }

    console.log("mediaInfo OUT", mediaInfo)
    return (
        <section className='homeScreen'>
            <HeaderComponent />
            <div className="homeScreenRowContainer">
                <NavigateBeforeIcon className='iconBefore' onClick={() => handleSlider("+")} />
                <div className='homeScreenRow' ref={mediaRowEl}>
                    {error && <Message message="No movies list found" />}
                    {mediaList && mediaList.map((media) => {
                        return (
                            <div key={media.Id} className='homeScreenCol'>
                                <img className="homeScreenColImage" onClick={() => getPlayInfo(media.Id)} src={filterImage(media.Images) !== ' ' ? filterImage(media.Images) : ImagePlaceholder} alt='slider' />
                                <h3>{media.Title}</h3>
                            </div>
                        )
                    })}
                </div>
                <NavigateNextIcon className='iconNext' onClick={() => handleSlider("-")} />
            </div>
            {open && <FilmPlayer openHandler={openHandler} media={mediaInfo} />}
        </section>
    );
};

export default HomeScreen;
