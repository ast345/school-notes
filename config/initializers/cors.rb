Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:3000'
      resource '/school_classes/:school_class_id/iframe',
                headers: :any,
                methods: [:get]
    end
  end