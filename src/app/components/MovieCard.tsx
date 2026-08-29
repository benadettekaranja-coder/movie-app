export default function MovieCard(
    {
        title,
        posterPath,
        rating,
    }: {
        title:string;
        posterPath: string;
        rating: number;
    }) 
    {
        return(
            <div>
                <img
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={title}
                />
                <h2>{title}</h2>
                <p>{rating}/10</p>
            </div>
            );
         }
    
