export class CreateDonDto {
    tenDon: string;
    tongTien: number;
    trangThai: 'dang_xu_ly' | 'hoan_thanh' | 'huy';
    tentk: string; // Tên tài khoản liên kết
  }
  