class SweepstakeInviteMailer < ApplicationMailer

  # @param [User] user
  # @param [Sweepstake] sweepstake
  # @param [SweepstakeInvite] sweepstake_invite
  # @param [User] invited_user
  def invite(user, sweepstake, sweepstake_invite, invited_user)
    @invited_user = invited_user
    @sweepstake_invite = sweepstake_invite
    @user = user
    mail(
      to: sweepstake_invite.email,
      subject: "Sou Loto: Convite para para participar do bolão #{sweepstake.description}"
    )
  end

end
