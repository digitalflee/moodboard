class MoodboardsController < ApplicationController

    def index
        @moodboards = Moodboard.all 
        render json: @moodboards, include: [:images]
    end

    def create
        @moodboard = Moodboard.create(moodboard_params)
        params[:gifs].each do |gif| 
            Image.create(url: gif, moodboard: @moodboard)
        end
        render json: @moodboard, include: [:images]
    end 

    def show 
        @moodboard = Moodboard.find(params[:id])
        render json: @moodboard, include: [:images] 
    end 
    
    def update
        @moodboard = Moodboard.find(params[:id])
        @moodboard.update(moodboard_params)
        render json: @moodboard, include: [:images] 
    end 
    
    def destroy
        @moodboard = Moodboard.find(params[:id])
        @moodboard.destroy
        render json: {}, include: [:images]
    end 

    private 

    def moodboard_params
        params.permit(:artist_name, :theme)
    end

end
