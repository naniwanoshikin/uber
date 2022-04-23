class ApplicationController < ActionController::API
  before_action :fake_load

  # 1秒だけプログラムの実行を止める
  def fake_load
    sleep(1)
  end
end
