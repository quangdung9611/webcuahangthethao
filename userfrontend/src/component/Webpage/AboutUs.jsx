import React from "react";
import "../CSS/about.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h2 className="about-title">Về Chúng Tôi</h2>
        <div className="about-content">
          <p>
            Chúng tôi là cửa hàng chuyên cung cấp các sản phẩm thể thao chất lượng cao, đặc biệt trong các môn vợt như cầu lông, tennis và pickleball. Với sự chọn lọc kỹ lưỡng từ các thương hiệu uy tín, cửa hàng cam kết mang đến sản phẩm chính hãng, phù hợp cho cả người chơi chuyên nghiệp lẫn người mới bắt đầu.
          </p>

          <p>
            Các mặt hàng tại cửa hàng luôn được cập nhật liên tục với mẫu mã mới nhất, đa dạng về kiểu dáng và tính năng. Từ vợt thi đấu, giày thể thao, quần áo chuyên dụng đến các phụ kiện hỗ trợ — tất cả đều được nhập trực tiếp từ nhà phân phối chính hãng, đảm bảo chất lượng và nguồn gốc rõ ràng.
          </p>

          <p>
            Giá cả được điều chỉnh hợp lý, cạnh tranh và minh bạch. Chúng tôi luôn nỗ lực giữ mức giá tốt nhất để khách hàng dễ dàng tiếp cận sản phẩm chất lượng mà không phải lo ngại về chi phí. Chính sách đổi trả, bảo hành và tư vấn cũng được xây dựng rõ ràng nhằm đảm bảo sự hài lòng tuyệt đối.
          </p>

        <div className="about-image-wrapper">
          <img
            src={`http://localhost:5000/images/pages/hinhgioithieu.jpg`}
            alt="Ảnh giới thiệu"
            className="about-image"
          />
        </div>

          <p>
            Với phương châm <strong>“Hàng chuẩn – Giá tốt – Phục vụ tận tâm”</strong>, cửa hàng đã trở thành điểm đến quen thuộc của cộng đồng yêu thể thao. Nhiều khách hàng thường xuyên quay lại để cập nhật mẫu mới, tìm sản phẩm phù hợp, hoặc đơn giản là nhận được sự tư vấn nhiệt tình từ đội ngũ nhân viên am hiểu sản phẩm.
          </p>

          <p>
            Chúng tôi không chỉ bán sản phẩm — chúng tôi đồng hành cùng bạn trên hành trình chinh phục thể thao. Mỗi lần bạn ghé thăm, mỗi đơn hàng bạn chọn, là một sự tin tưởng mà chúng tôi trân trọng sâu sắc.
          </p>

          <p>
            Từ tận đáy lòng, chúng tôi xin gửi lời cảm ơn chân thành đến tất cả quý khách hàng đã luôn ủng hộ và đồng hành cùng cửa hàng trong suốt thời gian qua. Sự tin yêu của bạn là động lực để chúng tôi không ngừng hoàn thiện và phát triển. Cảm xúc ấy không chỉ là niềm vui — mà là sự gắn bó, là lý do để chúng tôi tiếp tục phục vụ với tất cả tâm huyết.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
