<?php
/**
 * Class Verification_Meta
 *
 * @package   Google\Site_Kit
 * @copyright 2019 Google LLC
 * @license   https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://sitekit.withgoogle.com
 */

namespace Google\Site_Kit\Core\Authentication;

use Google\Site_Kit\Core\Storage\User_Setting;

/**
 * Class representing the site verification meta tag for a user.
 *
 * @since 1.1.0
 * @access private
 * @ignore
 */
final class Verification_Meta extends User_Setting {

	/**
	 * User option key.
	 */
	const OPTION = 'googlesitekit_site_verification_meta';

	/**
	 * Sets the value of the setting with the given value.
	 *
	 * @since n.e.x.t
	 *
	 * @param mixed $value Setting value. Must be serializable if non-scalar.
	 *
	 * @return bool True on success, false on failure.
	 */
	public function set( $value ) {
		/**
		 * Triggers the meta tag cache to be cleared.
		 */
		do_action( 'googlesitekit_invalidate_verification_meta_cache' );

		return parent::set( $value );
	}


	/**
	 * Gets the underlying meta key for the verification meta.
	 *
	 * @since n.e.x.t
	 *
	 * @return string
	 */
	public function get_meta_key() {
		return $this->user_options->get_meta_key( self::OPTION );
	}
}
