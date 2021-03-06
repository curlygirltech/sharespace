class BookingsController < ApplicationController
  before_action :authorize_request, only: [:user_bookings, :create]
  before_action :set_booking, only: [:show, :update, :destroy]

  # GET /bookings
  def index
    #show all for specific users 
    @bookings = Booking.all

    render json: @bookings
  end

  # GET /bookings/1
  def show
    render json: @booking
  end

  def user_bookings
    @bookings = Booking.where(user_id: @current_user.id) 
    render json: @bookings, include: :home
  end

  # POST /bookings
  def create
    @booking = Booking.new(booking_params)
    @booking.user = @current_user
    if @booking.save
      render json: @booking, status: :created
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bookings/1
  def update
    if @booking.update(booking_params)
      #if a review number exists 
      #find all bookings for this house
      #access all the review numbers 
      #combine numbers to create new avg 
      #store new average back on book 
      render json: @booking
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bookings/1
  def destroy
    @booking.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_booking
      @booking = Booking.find(params[:id])
      
      puts @booking
    end

    # Only allow a list of trusted parameters through.
    def booking_params
      params.require(:booking).permit(:user_id, :home_id, :start_date, :end_date, :price)
    end
end
