class ImagesController < ApplicationController

    def index
        @images = Image.all 
        render json: @images 
    end 

    def create
        @image = Image.create(image_params)
        render json: @image 
    end 

    def show 
        @image = Image.find(params[:id])
        render json: @image 
    end 
    
    def update
        @image = Image.find(params[:id])
        @image.update(image_params)
        render json: @image 
    end 
    
    def destroy
        @image = Image.find(params[:id])
        @image.destroy
        render json: {}
    end 

    private
    
    def image_params 
        params.permit(:url)
    end
end
