import { IBouquets } from '../../interfaces/IBouquets';
import noImage from '../../assets/no-photo.png';
import { Checkbox, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { MouseEventHandler } from 'react';
import { Info } from '@mui/icons-material';


interface Props extends IBouquets {
	onClick: MouseEventHandler<HTMLDivElement>;
	checkboxVisible?: boolean;
	selected: boolean,
	checkHandler: () => void
}

const RecipesComponent = ({
	onClick,
	id,
	bouquet_description,
	bouquet_name,
	author,
	image,
	sum,
	checkboxVisible,
	checkHandler,
  }: Props) => {
	let cardImage = noImage; 
	if (image) { 
	  cardImage = image; 
	}
	return (
		<ImageListItem key={id}>
			{checkboxVisible && 
			<Checkbox onClick={checkHandler} />}
		  <img src={cardImage} srcSet={cardImage} alt={bouquet_name} loading="lazy"/>
		  <ImageListItemBar 
		  	title={parseInt(sum).toFixed().toString() === 'NaN' ? '0 т' : `${parseInt(sum).toFixed()} т`} 
			position="top" />
		  <ImageListItemBar
			key={id}
			title={bouquet_name}
			subtitle={bouquet_description}
			onClick={onClick}
			actionIcon={
				<IconButton key={id} sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${author}`}>
				  <Info />
				</IconButton>
			}
		  />
		</ImageListItem>
	);
  };
  
  export default RecipesComponent;