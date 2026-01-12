import { IsString } from 'class-validator';

export class ConfirmTicketDto {
  @IsString()
  ticketId: string;
}
