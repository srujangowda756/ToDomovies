from fastapi import APIRouter,Depends
from database import get_db
from sqlalchemy.orm import Session
from schema.movie import MovieInput,ResponseMovie
from model.movie import Movie
import uuid

router = APIRouter(prefix="/movies",tags=["Movies"])

@router.get("/",response_model=list[ResponseMovie])
def get_movies(db: Session = Depends(get_db)):   
    movies = db.query(Movie).all()
    return movies

@router.post("/")
def add_movie(movie: MovieInput, db: Session = Depends(get_db)):
    new_movie = Movie(title=movie.title, watched=False)
    db.add(new_movie)
    db.commit()
    db.refresh(new_movie)
    return new_movie

@router.put("/")
def update_movie_status(movie_id: uuid.UUID, db: Session = Depends(get_db)):
    updating_movie=db.query(Movie).filter(Movie.id == movie_id).first()
    updating_movie.watched = not updating_movie.watched
    db.commit()
    db.refresh(updating_movie)
    return updating_movie

@router.delete("/")
def delete_movie(movie_id: uuid.UUID, db: Session = Depends(get_db)):
    deleting_movie=db.query(Movie).filter(Movie.id == movie_id).first()
    db.delete(deleting_movie)
    db.commit()
    return {"message": "Movie deleted successfully"}

